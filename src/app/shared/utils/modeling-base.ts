import { saveAs } from 'file-saver';
import { AppUtils } from './app.utils';
import { ConfigStateService, ListService, PagedResultDto, Rest, RestService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { inject } from '@angular/core';
import { FileType } from '../enums/file-type.enum';
import { ImportResultDto, ModelingHistoryDto, ModelingInputDto } from '@proxy/dtos';
import { OverridingMode } from '@proxy/enums';

export class ModelingBase<TService, TGetListInput, TCreateUpdateDto> {
  public isHistoryModalVisible = false;
  public isImportDetailsVisible = false;
  public importConfirmVisible = false;
  public importResult: ImportResultDto[] = [];
  public visiblePermissions = false;
  public providerKey?: string;
  public historys: PagedResultDto<ModelingHistoryDto>;
  public existingData = [];
  public newData = [];
  public restService: RestService = inject(RestService);
  public toasterService: ToasterService = inject(ToasterService);
  public confirmationService: ConfirmationService = inject(ConfirmationService);
  public configService: ConfigStateService = inject(ConfigStateService);

  constructor(public service: TService, public list: ListService<TGetListInput>, apiName: string) {
    this.service['exportByIds'] = (
      ids: string[],
      fileType: FileType,
      config?: Partial<Rest.Config>
    ) =>
      this.restService.request<any, number[]>(
        {
          method: 'POST',
          url: '/api/app/' + apiName + '/export',
          params: { fileType },
          body: ids,
        },
        { apiName: this.service['apiName'] ? this.service['apiName'] : 'Default', ...config }
      );

    this.service['exportAll'] = (fileType: FileType, config?: Partial<Rest.Config>) =>
      this.restService.request<any, number[]>(
        {
          method: 'POST',
          url: '/api/app/' + apiName + '/export-all',
          params: { fileType },
        },
        { apiName: this.service['apiName'] ? this.service['apiName'] : 'Default', ...config }
      );
    
    this.service['exportAllByTenant'] = (
      fileType: FileType,
      tenantDataTierType?: string,
      tenantDataTierId?: string,
      config?: Partial<Rest.Config>
    ) =>
      this.restService.request<any, number[]>(
        {
          method: 'POST',
          url: '/api/app/' + apiName + '/export-all-by-tenant',
          params: { fileType, tenantDataTierType, tenantDataTierId },
        },
        { apiName: this.service['apiName'] ? this.service['apiName'] : 'Default', ...config }
      );
  }

  export(e) {
    this.service['exportByIds'](e.objectIds, e.fileType).subscribe({
      next: (res: string) => {
        saveAs(
          this.base64ToBlob(res, AppUtils.generateFileName(e.objectType, e.fileType)),
          AppUtils.generateFileName(e.objectType, e.fileType)
        );
      },
      error: error => {
        this.confirmationService.error(error?.error?.error?.message, 'An error has occurred!', {
          hideCancelBtn: true,
          yesText: 'AbpAccount::Close',
        });
      },
    });
  }

  exportAll(e) {
    this.service['exportAll'](e.fileType).subscribe({
      next: (res: string) => {
        saveAs(
          this.base64ToBlob(res, AppUtils.generateFileName(e.objectType, e.fileType)),
          AppUtils.generateFileName(e.objectType, e.fileType)
        );
      },
      error: error => {
        this.confirmationService.error(error?.error?.error?.message, 'An error has occurred!', {
          hideCancelBtn: true,
          yesText: 'AbpAccount::Close',
        });
      },
    });
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  import(e) {
    // duplicates check
    const nameSet = new Set();
    const displayNameSet = new Set();
    const duplicates = [];

    e.data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (item[key] !== null && typeof item[key] !== 'object') {
          item[key] = item[key]?.toString();
        }
      });

      // duplicates check
      if (item.Name && nameSet.has(item.Name)) {
        duplicates.push(item);
      } else {
        nameSet.add(item.Name);
      }

      if (item.DisplayName && displayNameSet.has(item.DisplayName)) {
        duplicates.push(item);
      } else {
        displayNameSet.add(item.DisplayName);
      }

    });

    // duplicates check
    if (duplicates.length > 0) {
      this.confirmationService.error('::LABEL_DuplicateRecordsFound', '', {
        hideCancelBtn: true,
        yesText: 'AbpAccount::Close',
        messageLocalizationParams: [duplicates.map(d => d.Name || d.DisplayName).join(', ')],
      });
      return;
    }

    const models: TCreateUpdateDto[] = e.data;
    this.existingData = [];
    this.newData = [];
    this.service['getExistInstances'](models).subscribe(res => {
      // respone is existing instances with all fields, but data from file only has couple of fields
      // and maybe with new values, so filter those data based on API response
      // mostly name can be used for filtering
      // if not existing, then all new data, directly import
      if (res.length === 0) {
        this.importDataFunc(models);
      } else {
        // if existing, then compare and show to user for confirmation
        models.forEach((model: any) => {
          let existing;
          if (e.objectType === 'Users') {
            existing = res.find(item => item.userName === model.UserName);
          } else if (e.objectType === 'FocusedItems') {
            existing = res.find(
              item =>
                item.workCenterName === model.WorkCenterName &&
                item.partNumber == model.PartNumber &&
                item.priority == model.Priority
            );
          } else {
            existing = res.find(item => item.name === model.Name);
          }

          if (existing) {
            this.existingData.push(model);
          } else {
            this.newData.push(model);
          }
        });
        this.importConfirmVisible = true;
      }
    });
  }

  customeImport(selectedData) {
    this.importConfirmVisible = false;
    this.importDataFunc([...this.newData, ...selectedData]);
  }

  importDataFunc(data: any) {
    if (data.length === 0) {
      this.toasterService.info('::NoDataAvailableInDatatable');
      return;
    }
    this.service['importByDtosAndMode'](data, OverridingMode.Overwrite).subscribe(res => {
      if (res.items?.length > 0) {
        this.importResult = res.items;
        this.isImportDetailsVisible = true;
      } else {
        this.toasterService.success('::LABEL_SuccessfullyImported');
      }
      if (res.items?.length !== data.length) {
        this.list.get();
      }
    });
  }

  copy(e, callback = null) {
    const info = this.removeLastS(e.objectType);
    this.service['create'](e.data).subscribe(res => {
      this.toasterService.success('::LABEL_CopiedSuccessfully', '', {
        messageLocalizationParams: [info, e.data.name],
      });
      this.list.get();
      if (callback && typeof callback === 'function') {
        callback(res);
      }
    });
  }

  viewHistory({ id, name }) {
    let input: ModelingInputDto<string> = {
      id: id,
      maxResultCount: 1000,
      skipCount: 0,
      sorting: 'executionTime desc',
    };
    this.service['getModelingHistoryByInput'](input).subscribe(historys => {
      this.historys = historys;
      this.isHistoryModalVisible = true;
    });
  }

  multiDelete(e) {
    var infos = this.insertSpaces(e.objectType);
    this.confirmationService
      .warn('::LABEL_DeletionConfirmationMessage', '', {
        messageLocalizationParams: [infos, e.objectNames],
      })
      .subscribe(status => {
        if (status === Confirmation.Status.confirm) {
          this.service['multipleDeleteByIds'](e.objectIds).subscribe(() => {
            this.toasterService.success('::LABEL_SuccessfullyDeleted', '', {
              messageLocalizationParams: [infos, e.objectNames],
            });
            this.list.get();
          });
        }
      });
  }

  openPermissionsModal(row: any) {
    this.providerKey = row.name;
    setTimeout(() => {
      this.visiblePermissions = true;
    }, 0);
  }

  removeLastS(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/s$/, '');
  }
  
  insertSpaces(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }
}
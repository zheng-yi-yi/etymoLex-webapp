import { saveAs } from 'file-saver';
import { AppUtils } from './app.utils';
import { ConfigStateService, ListService, PagedResultDto, Rest, RestService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { inject } from '@angular/core';
import { FileType } from '../enums/file-type.enum';
import { ImportResultDto, ModelingHistoryDto, ModelingInputDto } from '@proxy/dtos';
import { OverridingMode } from '@proxy/enums';
import { read, utils } from 'xlsx-js-style';

export class ModelingBase<TService, TGetListInput, TCreateUpdateDto> {
  public searchKeyWord: string;
  public ShowCheckBoxColumn: boolean;
  public isViewModalOpen: any;
  public selected = [];
  public pageSize = 10;
  public readonly OverridingMode = OverridingMode;
  public readonly FileType = FileType;
  public acceptFileType = {
    [FileType.Json]: '.json',
    [FileType.Excel]: '.xls,.xlsx',
  };
  public uploadModalOpen = false;
  public ImportMode = OverridingMode.Skip;
  public importData: any = [];
  public isModalOpen = false;
  public importFileType = FileType.Json;
  public restService: RestService = inject(RestService);
  public toasterService: ToasterService = inject(ToasterService);
  public confirmationService: ConfirmationService = inject(ConfirmationService);
  public configService: ConfigStateService = inject(ConfigStateService);

  constructor(public service: TService, public list: ListService<TGetListInput>) {

  }

  search(query: string) {
    this.searchKeyWord = query;
    this.list.get();
  }

  importClick(fileType: FileType) {
    this.importFileType = fileType;
    this.ImportMode = OverridingMode.Skip;
    this.uploadModalOpen = true;
  }

  onFileChange(event: Event) {
    const htmlEl = event.target as HTMLInputElement;
    const file = htmlEl.files[0];
    const isJsonFile = this.importFileType === FileType.Json;
    if (file) {
      const reader = new FileReader();
      if (isJsonFile) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
      reader.onload = (e) => {
        const data = e.target?.result;
        if (isJsonFile) {
          if (typeof data === 'string') {
            this.importData = JSON.parse(data);
          }
        } else {
          const workbook = read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          this.importData = utils.sheet_to_json(workbook.Sheets[sheetName], { raw: true });
        }
      };
    } else {
      this.importData = [];
    }
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

  insertSpaces(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }
}
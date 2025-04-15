import { ListService, LocalizationService, PagedResultDto, PermissionService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelingBase } from '../shared/utils/modeling-base';
import { MorphemeService } from '@proxy';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { FileType, MorphemeType } from '@proxy/enums';
import { AppUtils } from '../shared/utils/app.utils';
import { saveAs } from 'file-saver';
import { CreateUpdateMorphemeDto, MorphemeDto, MorphemeGetListInput } from '@proxy/dtos/morpheme';

@Component({
  selector: 'app-morphemes',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './morphemes.component.html',
  styleUrl: './morphemes.component.scss',
  providers: [
    ListService
  ]
})
  
export class MorphemesComponent
  extends ModelingBase<MorphemeService, MorphemeGetListInput, CreateUpdateMorphemeDto>
  implements OnInit {
  data = { item: [], totalCount: 0 } as PagedResultDto<MorphemeDto>;
  currentDto = {} as MorphemeDto;
  form: FormGroup;
  morphemeTypes = [
    { label: '词根', value: MorphemeType.Root },
    { label: '前缀', value: MorphemeType.Prefix },
    { label: '后缀', value: MorphemeType.Suffix }
  ];
  originLanguages = [
    '拉丁'
  ];
  searchFilterType: MorphemeType;

  constructor(
    public readonly list: ListService<MorphemeGetListInput>,
    public morphemeService: MorphemeService,
    public fb: FormBuilder,
    public confirmation: ConfirmationService,
    public toasterService: ToasterService,
    public permissionService: PermissionService,
    public localizationService: LocalizationService
  ) {
    super(morphemeService, list);
  }

  ngOnInit() {
    this.hookToQuery();
  }

  hookToQuery() {
    this.list
      .hookToQuery(query => {
        return this.morphemeService.getList({ ...query, filter: this.searchKeyWord, type: this.searchFilterType });
      })
      .subscribe(res => {
        this.data = res;
      });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.currentDto.name || '', Validators.required],
      displayName: [this.currentDto.displayName || '', Validators.required],
      description: [this.currentDto.description || ''],
      type: [this.currentDto.type || null, Validators.required],
      value: [this.currentDto.value || '', Validators.required],
      originLanguage: [this.currentDto.originLanguage || '', Validators.required],
      meaning: [this.currentDto.meaning || '', Validators.required],
    });
  }

  create() {
    this.currentDto = {} as MorphemeDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  edit(row) {
    this.morphemeService.get(row.id).subscribe((data) => {
      this.currentDto = data;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
  
    const request = this.currentDto.id
      ? this.morphemeService.update(this.currentDto.id, this.form.value)
      : this.morphemeService.create(this.form.value);
  
    request.subscribe(() => {
      if (!this.currentDto.id) {
        this.toasterService.success('::LABEL_CreatedSuccessfully', '', {
          messageLocalizationParams: ["", this.form.value.name],  // 第一个参数应当用 this.info 来代替
        });
      } else {
        this.toasterService.success('::LABEL_UpdatedSuccessfully', '', {
          messageLocalizationParams: ["", this.currentDto.name], // 第一个参数应当用 this.info 来代替
        });
      }
  
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  view(row) {
    this.morphemeService.get(row.id).subscribe((data) => {
      this.currentDto = data;
      this.isViewModalOpen = true;
    });
  }

  delete(e: any) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure', {
      messageLocalizationParams: [e.name],
    }).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.morphemeService.delete(e.id).subscribe(() => {
          this.toasterService.success('::LABEL_SuccessfullyDeleted', '', {
            messageLocalizationParams: ["", e.name], // 第一个参数应当用 this.info 来代替
          });
          this.list.get();
        });
      }
    });
  }

  exportSelected(fileType: FileType) {
    const selectedIds = this.selected.map(s => s.id);
    if (selectedIds.length > 0) {
      this.morphemeService.exportByFileTypeAndIds(fileType, selectedIds).subscribe({
        next: (res: any) => {
          console.log(res);
          const fileName = AppUtils.generateFileName('data', fileType);
          const blob = AppUtils.base64ToBlob(res, fileName);
          
          if (fileType === FileType.Json) {
            AppUtils.blobToJson(blob).then(jsonString => {
              const jsonBlob = new Blob([jsonString], { type: 'application/json' });
              saveAs(jsonBlob, fileName);
            }).catch(error => {
              console.error("Error converting blob to JSON:", error);
            });
          } else {
            saveAs(blob, fileName);
          }
  
          this.toasterService.success('::ExportedSuccessfully');
        },
        error: (error) => {
          this.confirmation.error(error?.error?.message, 'An error has occurred!', {
            hideCancelBtn: true,
            yesText: 'AbpAccount::Close',
          });
        }
      });
    }
  }

  multiDelete() {
    const selectedIds = this.selected.map(s => s.id);
    if (selectedIds.length > 0) {
      this.confirmation.warn('::AreYouSureToDeleteSeleted', '::AreYouSure').subscribe((status) => {
        if (status === Confirmation.Status.confirm) {
          this.morphemeService.multipleDeleteByIds(selectedIds).subscribe(() => {
            this.toasterService.success('::MultiDeletedSuccessfully');
            this.list.get();
          });
        }
      });
    }
  }

  importFile() {
    this.morphemeService.importByDtosAndMode(this.importData, this.ImportMode).subscribe(() => {
      this.toasterService.success('::ImportedSuccessfully');
      this.uploadModalOpen = false;
      this.importData = [];
      this.list.get();
    });
  }

  pageChange(event) {
    this.pageSize = Number(event);
  }

  onSelect({ selected }) {
    this.selected = selected;
    console.log(this.selected)
  }

  displayCheck() {
    return true;
  }

  getMorphemeLabel(type: number): string {
    const morpheme = this.morphemeTypes.find(t => t.value === type);
    return morpheme ? morpheme.label : type.toString();
  }

  onFilterTypeChange() {
    this.list.get();
  }
}

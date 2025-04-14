import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ExtensibleModule } from '@abp/ng.components/extensible';
import { PageModule } from '@abp/ng.components/page';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { NgbDropdownModule, NgbNavModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
  ],
  exports: [],
  imports: [
    SharedModule,
    ThemeSharedModule,
    ExtensibleModule,
    PageModule,
    NgApexchartsModule,
    NgxValidateCoreModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    TagInputModule,
    NgxDatatableModule,
    TooltipModule,
    NgbTimepickerModule
  ],
})
  
export class ModelingModule { }


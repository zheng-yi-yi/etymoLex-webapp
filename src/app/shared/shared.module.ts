import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { DatatableFooterComponent } from './components/datatable-footer/datatable-footer.component';
import { GradientSelectorComponent } from './components/gradient-selector/gradient-selector.component';

@NgModule({
  declarations: [
    DatatableFooterComponent,
    GradientSelectorComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    DatatableFooterComponent,
    GradientSelectorComponent
  ],
  providers: []
})
export class SharedModule {}

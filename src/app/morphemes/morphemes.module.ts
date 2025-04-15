import { NgModule } from '@angular/core';

import { MorphemesRoutingModule } from './morphemes-routing.module';
import { MorphemesComponent } from './morphemes.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    MorphemesComponent
  ],
  imports: [
    SharedModule,
    MorphemesRoutingModule,
    NgSelectModule,
    NgbNavModule
  ]
})
export class MorphemesModule { }

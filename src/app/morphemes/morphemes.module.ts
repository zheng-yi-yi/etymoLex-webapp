import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MorphemesRoutingModule } from './morphemes-routing.module';
import { MorphemesComponent } from './morphemes.component';


@NgModule({
  declarations: [
    MorphemesComponent
  ],
  imports: [
    CommonModule,
    MorphemesRoutingModule
  ]
})
export class MorphemesModule { }

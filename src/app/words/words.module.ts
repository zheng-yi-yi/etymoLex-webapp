import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    WordsComponent
  ],
  imports: [
    CommonModule,
    WordsRoutingModule,
    NgbNavModule
  ]
})
export class WordsModule { }

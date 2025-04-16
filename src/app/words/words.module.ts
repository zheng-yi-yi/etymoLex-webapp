import { NgModule } from '@angular/core';

import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WordsComponent
  ],
  imports: [
    SharedModule,
    WordsRoutingModule,
    NgbNavModule
  ]
})
export class WordsModule { }

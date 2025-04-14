import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorphemesComponent } from './morphemes.component';

const routes: Routes = [{ path: '', component: MorphemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorphemesRoutingModule { }

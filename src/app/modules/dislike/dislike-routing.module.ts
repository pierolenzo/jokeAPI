import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DislikeComponent } from './dislike.component';

const routes: Routes = [{ path: '', component: DislikeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DislikeRoutingModule { }

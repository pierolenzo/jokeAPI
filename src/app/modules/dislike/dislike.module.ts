import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DislikeRoutingModule } from './dislike-routing.module';
import { DislikeComponent } from './dislike.component';


@NgModule({
  declarations: [
    //DislikeComponent
  ],
  imports: [
    CommonModule,
    DislikeRoutingModule
  ]
})
export class DislikeModule { }


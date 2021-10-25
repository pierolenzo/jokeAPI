import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './components/container/container.component'
import { LikeComponent } from './modules/like/like.component';
import { LikeModule } from './modules/like/like.module';
import { DislikeModule } from './modules/dislike/dislike.module';
import { DislikeComponent } from './modules/dislike/dislike.component';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LikeComponent,
    DislikeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LikeModule,
    DislikeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

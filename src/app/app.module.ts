import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './components/container/container.component'
import { LikeComponent } from './modules/like/like.component';
import { LikeModule } from './modules/like/like.module';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LikeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LikeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  { path: 'home', component: ContainerComponent },
  /**{ path: 'like', loadChildren: () => import('./modules/like/like.module').then(m => m.LikeModule) },
  { path: 'dislike', loadChildren: () => import('./modules/dislike/dislike.module').then(m => m.DislikeModule) },
  */{ path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

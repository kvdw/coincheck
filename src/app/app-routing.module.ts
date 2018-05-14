import { CoinIndexComponent } from './coin-index/coin-index.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';

const routes: Routes = [
 // { path: '', component: RolViewComponent },

  { path: '', component: CoinIndexComponent},
//  { path: 'rollen/view', component: RollenViewAllComponent},
  { path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

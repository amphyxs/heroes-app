import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: '', component: HomePageComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

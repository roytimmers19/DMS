import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_helpers/auth.guard';
import {PlanningComponent} from '@app/planning/planning.component';
import {Role} from "@app/_models/role";

const routes: Routes = [
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-rit',
    component: PlanningComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'user-rit',
    component: PlanningComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // otherwise redirect to home
  {path: '**', redirectTo: 'planning'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

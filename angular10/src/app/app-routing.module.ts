import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { SingninSignupComponent } from './singnin-signup/singnin-signup.component';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
  {path:'', component: SingninSignupComponent},
  {path:'userManagement',canActivate: [AuthGuardService], component: UserManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ HttpClientModule }from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingninSignupComponent } from './singnin-signup/singnin-signup.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ShowUserComponent } from './user-management/show-user/show-user.component';
import { AddEditUserComponent } from './user-management/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SingninSignupComponent,
    UserManagementComponent,
    ShowUserComponent,
    AddEditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

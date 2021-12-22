import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { HomeComponent } from './_components/home/home.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { AdminComponent } from './_components/admin/admin.component';
import { UserComponent } from './_components/user/user.component';
import { AuthInterceptorProviders } from './_helpers/auth.interceptor';
import { AddMemberComponent } from './_components/add-member/add-member.component';
import { MembersListComponent } from './_components/members-list/members-list.component';
import { MemberDetailsComponent } from './_components/member-details/member-details.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { UpdateMemberComponent } from './_components/update-member/update-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    UserComponent,
    AddMemberComponent,
    MembersListComponent,
    MemberDetailsComponent,
    NavbarComponent,
    UpdateMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }

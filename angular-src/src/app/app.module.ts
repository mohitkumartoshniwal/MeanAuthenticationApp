import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { VendorregisterComponent } from './components/vendorregister/vendorregister.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { VendorprofileComponent } from './components/vendorprofile/vendorprofile.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';

import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'userregister', component: UserregisterComponent},
  {path:'vendorregister', component: VendorregisterComponent},
  {path:'userprofile', component: UserprofileComponent, canActivate:[AuthGuard]},
  {path:'vendorprofile', component: UserprofileComponent},
  {path:'userlogin', component: UserloginComponent},
  {path:'vendorlogin', component: UserloginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserregisterComponent,
    VendorregisterComponent,
    UserprofileComponent,
    VendorprofileComponent,
    UserloginComponent,
    VendorloginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [ValidateService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

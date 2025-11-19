import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent }from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientsComponent } from './patients/patients.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SettingsComponent } from './settings/settings.component';

const  routes: Routes =[
  {path:'', redirectTo:'/login',pathMatch: 'full'},
 {path:'login', component:LoginComponent}, 
{ path: 'signup', component: SignupComponent },
{path:'dashboard',component:DashboardComponent},
{path:'doctor',component:DoctorComponent},
{path:'patients',component:PatientsComponent},
{path:'appointments',component:AppointmentsComponent},
{path:'settings',component:SettingsComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}

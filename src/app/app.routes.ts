import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./Shared/auth.guard";
import { OwnersComponent } from './owners/owners.component';

export const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'home',component:  HomeComponent,canActivate :[AuthGuard]},
  {path : 'owners',component:  OwnersComponent,canActivate :[AuthGuard]},

  {path:"**",redirectTo:"login"}
];

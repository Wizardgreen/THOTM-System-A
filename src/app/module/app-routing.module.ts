import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { MemberInfoComponent } from '@views/member-info/member-info.component';
import { MemberListComponent } from '@views/member-list/member-list.component';
import { MemberCreateComponent } from '@views/member-create/member-create.component';
import { LoginComponent } from '@views/login/login.component';
import { HomeComponent } from '@views/home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  {
    path: 'member-list',
    component: MemberListComponent,
    data: {
      animation: 'MemberList',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'member-list/:id',
    component: MemberInfoComponent,
    data: {
      animation: 'MemberInfo',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'member-create',
    component: MemberCreateComponent,
    data: {
      animation: 'MemberCreate',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animation: 'MemberCreate',
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

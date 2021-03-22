import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberInfoComponent } from '@views/member-info/member-info.component';
import { MemberListComponent } from '@views/member-list/member-list.component';
import { MemberCreateComponent } from '@views/member-create/member-create.component';
import { LoginComponent } from '@views/login/login.component';

import { DashComponent } from '@views/dash/dash.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { animation: 'Login' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'Login' },
  },
  {
    path: 'member-list',
    component: MemberListComponent,
    data: { animation: 'MemberList' },
  },
  {
    path: 'member-list/:id',
    component: MemberInfoComponent,
    data: { animation: 'MemberInfo' },
  },
  {
    path: 'member-create',
    component: MemberCreateComponent,
    data: { animation: 'MemberCreate' },
  },
  { path: 'dash', component: DashComponent, data: { animation: 'Dash' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

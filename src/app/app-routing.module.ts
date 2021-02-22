import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  { path: 'member-list', component: MemberListComponent },
  { path: 'dash', component: DashComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

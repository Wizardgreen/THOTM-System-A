import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MemberListComponent } from './views/member-list/member-list.component';
import { MemberInfoComponent } from './views/member-info/member-info.component';
import { MemberCreateComponent } from './views/member-create/member-create.component';
import { DashComponent } from './views/dash/dash.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RowComponent } from './components/row/row.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './module/app-routing.module';
import { environment } from './../environments/environment';

import { SharedMaterialModule } from './module/shared-material.module';
import { ProgramUpdateDialogComponent } from './views/member-info/program-update-dialog/program-update-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberInfoComponent,
    MemberCreateComponent,
    DashComponent,
    SpinnerComponent,
    RowComponent,
    PageWrapperComponent,
    ProgramUpdateDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    SharedMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

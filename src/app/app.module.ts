import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MemberListComponent } from '@views/member-list/member-list.component';
import { AlertSheetComponent } from '@views/member-list/alert-sheet/alert-sheet.component';

import { MemberInfoComponent } from '@views/member-info/member-info.component';
import { ProgramUpdateDialogComponent } from '@views/member-info/program-update-dialog/program-update-dialog.component';
import { StorageUpdateDialogComponent } from '@views/member-info/storage-update-dialog/storage-update-dialog.component';
import { MemberCreateComponent } from '@views/member-create/member-create.component';
import { DashComponent } from '@views/dash/dash.component';
import { LoginComponent } from '@views/login/login.component';

import { SpinnerComponent } from '@components/spinner/spinner.component';
import { RowComponent } from '@components/row/row.component';
import { PageWrapperComponent } from '@components/page-wrapper/page-wrapper.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from './../environments/environment';

import { AppRoutingModule } from '@module/app-routing.module';
import { SharedMaterialModule } from '@module/shared-material.module';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberInfoComponent,
    MemberCreateComponent,
    DashComponent,
    LoginComponent,
    SpinnerComponent,
    RowComponent,
    PageWrapperComponent,
    ProgramUpdateDialogComponent,
    StorageUpdateDialogComponent,
    AlertSheetComponent,
    HomeComponent,
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

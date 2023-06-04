import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Shared/material.module';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { MemberCardComponent } from './Member/member-card/member-card.component';
import { JwtInterceptor } from './_Interceptor/jwt.interceptor';
import { MemberDitailComponent } from './Member/member-ditail/member-ditail.component';
import { MemberEditeComponent } from './Member/member-edite/member-edite.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_Interceptor/loading.interceptor';
import { UploaderModule } from 'angular-uploader';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PhotoUploadeComponent } from './photo-uploade/photo-uploade.component';
import { ListsComponent } from './Member/lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SignUpComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDitailComponent,
    MemberEditeComponent,
    PhotoUploadeComponent,
    ListsComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterModule,
    UploaderModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
    NgxFileDropModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormifyModule } from './formify/formify.module';
import {CustomModule} from './formify/custom/custom.module';
import {MaterialModule} from './formify/material.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {MembershipComponent} from './examples/membership/membership.component';
import { RegisterComponent } from './examples/register/register.component';
import { LoginComponent } from './examples/login/login.component';
import { HighlightsComponent } from './examples/highlights/highlights.component';
import { HeaderComponent } from './examples/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    MembershipComponent,
    RegisterComponent,
    LoginComponent,
    HighlightsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormifyModule,
    CustomModule,
    MaterialModule,
    NgxJsonViewerModule,
    HighlightModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

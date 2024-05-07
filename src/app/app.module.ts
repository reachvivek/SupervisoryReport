import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';

import { InputTextModule } from 'primeng/inputtext';
import { BASE_PATH } from '../swagger';
import { environment } from '../environments/prod/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    ButtonModule,
    CalendarModule,
    TableModule,
    StyleClassModule,
    InputTextModule,
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.BASE_PATH }],
  bootstrap: [AppComponent],
})
export class AppModule {}

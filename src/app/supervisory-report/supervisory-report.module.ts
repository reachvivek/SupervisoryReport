import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisoryReportRoutingModule } from './supervisory-report-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { LoaderComponent } from '../standalone/loader/loader.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    SupervisoryReportRoutingModule,

    ButtonModule,
    CalendarModule,
    TableModule,
    StyleClassModule,
    InputTextModule,
    LoaderComponent,
  ],
})
export class SupervisoryReportModule {}

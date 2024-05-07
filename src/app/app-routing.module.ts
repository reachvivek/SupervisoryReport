import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/supervisory-report',
    pathMatch: 'full',
  },
  {
    path: 'supervisory-report',
    loadChildren: () =>
      import('./supervisory-report/supervisory-report.module').then(
        (m) => m.SupervisoryReportModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

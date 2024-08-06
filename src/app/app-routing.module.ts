import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartSettingsComponent } from './components/admin/chart-settings/chart-settings.component';
import { ChartViewerComponent } from './components/client/chart-viewer/chart-viewer.component';

const routes: Routes = [
  {path:'settings', component:ChartSettingsComponent},
  {path:'', component:ChartViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
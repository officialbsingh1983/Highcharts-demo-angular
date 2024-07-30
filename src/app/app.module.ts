import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartSettingsComponent } from './components/admin/chart-settings/chart-settings.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddChartComponent } from './components/admin/add-chart/add-chart.component';
import { ChartSettingsService } from './services/chart-settings/chart-settings-service.service';
import { fnChartConfigReducer } from './stores/chartConfig/chart-config.reducer';
import { ChartConfigEffects } from './stores/chartConfig/chart-config.effects';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartViewerComponent } from './components/client/chart-viewer/chart-viewer.component';
import {JsonPipe} from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    ChartSettingsComponent,
    AddChartComponent,
    ChartViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({chartConfigs:fnChartConfigReducer}),
    EffectsModule.forRoot([ChartConfigEffects]),
    //StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HighchartsChartModule,
    FormsModule,
    JsonPipe
  ],
  providers: [
    provideAnimationsAsync(),
    ChartSettingsService,
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

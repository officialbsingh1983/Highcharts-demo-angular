import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IChartConfig } from '../../../stores/models/chart-config.model';
import { Store } from '@ngrx/store';
import { loadChartConfigs } from '../../../stores/chartConfig/chart-configs.action';
import { getChartConfigList } from '../../../stores/chartConfig/chart-config.selector';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonUtilitiesService } from '../../../services/common-utilities.service';
@Component({
  selector: 'app-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrl: './chart-viewer.component.css',
})
export class ChartViewerComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConfigList: IChartConfig[] = [];
  public chartOptionsList: Highcharts.Options[] = [];
  today = new Date();

  readonly range = new FormGroup({
    start: new FormControl<Date>(new Date(this.today.getTime() - (7 * 24 * 60 * 60 * 1000))),
    end: new FormControl<Date>(this.today),
  });
  constructor(private store: Store, private commonUtilities: CommonUtilitiesService) { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.store.dispatch(loadChartConfigs());
    this.store.select(getChartConfigList).subscribe(data => {
      this.chartConfigList = data;
      if (this.chartConfigList.length > 0) {

        this.generateChartData();
      }
    })
  }
  filterDateWise() {
    this.generateChartData();
  }
  generateChartData() {
    let totalDays = this.commonUtilities.getDaysBetweenDates(this.range.controls.start.value as Date, this.range.controls.end.value as Date);
    let dateRangeArray = this.commonUtilities.getDatesListBetweenRange(this.range.controls.start.value as Date, this.range.controls.end.value as Date);
    this.chartOptionsList = [];
    this.chartConfigList.forEach(element => {
      if (element.isVisible) {
        let graphValues = Array.from({ length: totalDays }, () => Math.floor(Math.random() * this.commonUtilities.getRandomNosBetweenRange(10, 200)));
        let chartOptions: Highcharts.Options = {
          title: {
            text: element.chartTitle,
            align: 'center'
          },
          yAxis: {
            title: {
              text: 'Values'
            }
          },
          xAxis: {
            title: {
              text: 'Date',

            },
            categories: dateRangeArray,
          },
          series: [{
            type: element.chartType as any,
            name: 'Values',
            data: graphValues,
            color: element.color,
          }],
        };
        this.chartOptionsList.push(chartOptions)
      }
    });
  }
}

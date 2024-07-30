import { ChangeDetectionStrategy, Component, OnInit, Type } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IChartConfig } from '../../../stores/models/chart-config.model';
import { Store } from '@ngrx/store';
import { loadChartConfigs } from '../../../stores/chartConfig/chart-configs.action';
import { getChartConfigList } from '../../../stores/chartConfig/chart-config.selector';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrl: './chart-viewer.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
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
  constructor(private store: Store) { }
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
    let totalDays = this.calculateDiff(this.range.controls.start.value as Date, this.range.controls.end.value as Date);
    console.log('totalDays ', totalDays);
    let dateRangeArray = this.getDatesInRange(this.range.controls.start.value as Date, this.range.controls.end.value as Date);
    this.chartOptionsList = [];
    this.chartConfigList.forEach(element => {
      if (element.isVisible) {
        let graphValues = Array.from({ length: totalDays }, () => Math.floor(Math.random() * 40));
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
  calculateDiff(startDate: Date, end: Date) {
    var timeDiff = end.getDate() - startDate.getDate();
    var diff = timeDiff+1;// / (1000 * 3600 * 24);
    return Math.floor(diff);
  }
  getDatesInRange(startDate: Date, endDate: Date) {
    const start = new Date(new Date(startDate));
    let end = new Date(new Date(endDate));
    const date = new Date(start.getTime());
    const dates: string[] = [];

    while (date <= end) {
      //console.log('after ' , end)
      dates.push(date.toDateString());
      date.setDate(date.getDate() + 1);
    }
    console.log(dates)
    return dates;
  }

}

import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChartComponent } from '../add-chart/add-chart.component';
import { Store } from '@ngrx/store';
import { IChartConfig } from '../../../stores/models/chart-config.model';
import { getChartConfigList } from '../../../stores/chartConfig/chart-config.selector';
import { loadChartConfigs, getChartConfigById } from '../../../stores/chartConfig/chart-configs.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrl: './chart-settings.component.css'
})
export class ChartSettingsComponent implements OnInit {
  chartConfigList: IChartConfig[]=[];
  dataSource:any;
  colToBeShown:string[]=['id','chartTitle','chartType','color','isVisible', 'action'];
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog: MatDialog, private store: Store){}
  ngOnInit(): void {
    this.store.dispatch(loadChartConfigs());
    this.store.select(getChartConfigList).subscribe(data=>{
      this.chartConfigList = data;
      this.dataSource=new MatTableDataSource<IChartConfig>(this.chartConfigList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  fnOpenAddChartModal(){
    this.openDialog('', 'Add chart config');
  }
  fnOpenUpdateChartModal(id: string){
    this.store.dispatch(getChartConfigById({id:id}));
    this.openDialog(id, 'Edit chart config');
  }
  openDialog(id:string, dialogTitle:string){
    this.dialog.open(AddChartComponent, {
      width:'50%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{id:id, dialogTitle:dialogTitle}
    })
  }
}

import { Component,Inject,OnInit
 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createChartConfigs } from '../../../stores/chartConfig/chart-configs.action';
import { getChartConfigById } from '../../../stores/chartConfig/chart-config.selector';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.css'
})
export class AddChartComponent implements OnInit {
  public form: any;
  //public dialogTitle: string='';
  constructor(private builder: FormBuilder,
    private ref:MatDialogRef<AddChartComponent>,    
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private store:Store)
    {}
  ngOnInit(): void {
   this.form=this.builder.group({
      id: this.builder.control(this.dialogData.id==''? Guid.create().toString(): this.dialogData.id),
      chartTitle: this.builder.control('', Validators.required),
      chartType: this.builder.control('', Validators.required),
      color: this.builder.control('', Validators.required),
      isVisible: this.builder.control(true, Validators.required)
    });
  }

  ngAfterViewInit(){
   
   
    if(this.dialogData.id!=''){
      this.store.select(getChartConfigById).subscribe(res=>{
        console.log(res, 'fff')
        // if((res instanceof Array)){
        //   var single = [res];
        //   console.log(res, 'sdfsfsfsd')
        //   this.form.setValue({
        //   id: single[0].id,
        //   chartTitle: single[0].chartTitle,
        //   chartType: single[0].chartType,
        //   color: single[0].color,
        //   isVisible:single[0].isVisible
        // });
        // }
        
      })
    }
  }

  fnSaveChart(){
    if(this.form.valid){
      if(this.form.controls.id.value!=''){
        this.store.dispatch(createChartConfigs({inputData:this.form.value}));
      }
      else{
        console.log('asdasasd');
      }
      this.fnCloseDialog();
    }
  }

  fnCloseDialog(){
    this.ref.close();
  }
}

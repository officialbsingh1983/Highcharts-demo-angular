import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createChartConfigs, updateChartConfigs } from '../../../stores/chartConfig/chart-configs.action';
import { getChartConfigById } from '../../../stores/chartConfig/chart-config.selector';
import { Guid } from 'guid-typescript';
import { IChartConfig } from '../../../stores/models/chart-config.model';
@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.css'
})
export class AddChartComponent implements OnInit {
  public form: any;
  colorFromPicker: string = '#011515';
  constructor(private builder: FormBuilder,
    private ref: MatDialogRef<AddChartComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store) { }
  ngOnInit(): void {
    this.form = this.builder.group({
      id: this.builder.control(this.dialogData.id == '' ? Guid.create().toString() : this.dialogData.id),
      chartTitle: this.builder.control('', Validators.required),
      chartType: this.builder.control('line', Validators.required),
      color: this.builder.control(this.colorFromPicker, Validators.required),
      isVisible: this.builder.control(true, Validators.required)
    });
  }

  ngAfterViewInit() {
    if (this.dialogData.id != '') {
      this.store.select(getChartConfigById).subscribe(res => {
        if ((res instanceof Array)) {
          this.form.patchValue((res as Array<IChartConfig>)[0]);
        }
      })
    }
  }

  fnSaveChart() {
    if (this.form.valid) {
      if (this.dialogData.id == '') {
        this.store.dispatch(createChartConfigs({ inputData: this.form.value }));
      }
      else {
        this.store.dispatch(updateChartConfigs({ inputData: this.form.value }));
      }
      this.fnCloseDialog();
    }
  }

  onColorPickerChange(event: any) {
    this.form.controls.color.patchValue(event);
  }
  fnCloseDialog() {
    this.ref.close();
  }
}

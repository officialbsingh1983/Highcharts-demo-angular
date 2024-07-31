import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChartConfig } from '../../stores/models/chart-config.model';

@Injectable({
  providedIn: 'root'
})
export class ChartSettingsService {
  baseUrl='http://localhost:3000/chartConfigObj';
  constructor(private httpClient: HttpClient) { }
  GetAllChartConfigList(){
    return this.httpClient.get<IChartConfig[]>(this.baseUrl);
  }
  GetChartConfigById(id: string){
    return this.httpClient.get<IChartConfig>(this.baseUrl+'?id='+ id);
  }
  CreateChartConfig(data: IChartConfig){
    return this.httpClient.post(this.baseUrl, data);
  }
  UpdateChartConfig(data: IChartConfig){
    return this.httpClient.put(this.baseUrl+ '/' + data.id, data);
  }
  DeleteChartConfig(id: string){
    return this.httpClient.delete(this.baseUrl+'/'+id);
  }
}

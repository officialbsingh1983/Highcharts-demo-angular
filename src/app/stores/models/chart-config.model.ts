import {EntityState} from '@ngrx/entity'
export interface IChartConfig{
    id: string,
    chartTitle: string,
    chartType: string,
    color: string,
    isVisible: boolean
}

// export interface IChartConfigModel extends EntityState<IChartConfig>{}
export interface IChartConfigModel{
    list:IChartConfig[],
    chartConfigObj: IChartConfig,
    errorMessage:string
}
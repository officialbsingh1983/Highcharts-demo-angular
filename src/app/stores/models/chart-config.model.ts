export interface IChartConfig{
    id: string,
    chartTitle: string,
    chartType: string,
    color: string,
    isVisible: boolean
}

export interface IChartConfigModel{
    list:IChartConfig[],
    chartConfigObj: IChartConfig,
    errorMessage:string
}
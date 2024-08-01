import { IChartConfigModel } from "../models/chart-config.model";

export const ChartConfigsState: IChartConfigModel={
    list:[],
    chartConfigObj:{
        id: "",
        chartTitle: "",
        chartType: "line",
        color: "",
        isVisible: true
    },
    errorMessage:''
}
// import { createEntityAdapter } from "@ngrx/entity";
// import { IChartConfig, IChartConfigModel } from "../models/chart-config.model";

import { IChartConfigModel } from "../models/chart-config.model";

// export const chartConfigAdapter = createEntityAdapter<IChartConfig>();
// export const chartConfigState: IChartConfigModel = chartConfigAdapter.getInitialState();

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
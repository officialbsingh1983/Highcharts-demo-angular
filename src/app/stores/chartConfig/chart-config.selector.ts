import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IChartConfigModel } from "../models/chart-config.model";

const getChartConfigState=createFeatureSelector<IChartConfigModel>('chartConfigs');

export const getChartConfigList = createSelector(getChartConfigState, (state)=>{
    return state.list;
})

export const getChartConfigById = createSelector(getChartConfigState, (state)=>{
    return state.chartConfigObj;
})
import { createAction, props } from "@ngrx/store";
import { IChartConfig } from "../models/chart-config.model";

export const loadChartConfigs = createAction('[chart configs]LoadChartConfigs');
export const loadChartConfigsSuccess = createAction('[chart configs]LoadChartConfigsSuccess', props<{ list: IChartConfig[] }>());
export const loadChartConfigsFailed = createAction('[chart configs]LoadChartConfigsFailed', props<{ errorMesage: string }>());

export const getChartConfigById = createAction('[chart configs]GetChartConfigById', props<{ id: string }>());
export const getChartConfigsByIdSuccess = createAction('[chart configs]GetChartConfigsByIdSuccess', props<{ chartConfig: IChartConfig }>());

export const createChartConfigs = createAction('[chart configs]CreateChartConfigs', props<{ inputData: IChartConfig }>());
export const createChartConfigsSuccess = createAction('[chart configs]CreateChartConfigsSuccess', props<{ inputData: IChartConfig }>());


export const updateChartConfigs = createAction('[chart configs]UpdateChartConfigs', props<{ inputData: IChartConfig }>());
export const updateChartConfigsSuccess = createAction('[chart configs]UpdateChartConfigsSuccess', props<{ inputData: IChartConfig }>());

export const deleteChartConfigById = createAction('[chart configs]DeleteChartConfigById', props<{ id: string }>());
export const deleteChartConfigsByIdSuccess = createAction('[chart configs]DeleteChartConfigsByIdSuccess', props<{ id: string }>());


export const displayAlert = createAction('[Display Alert]', props<{ message: string, resultType: string }>());
export const emptyAction = createAction('[Empty Alert]');
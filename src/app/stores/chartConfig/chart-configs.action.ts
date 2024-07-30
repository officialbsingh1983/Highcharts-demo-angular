import { createAction, props } from "@ngrx/store";
import { IChartConfig } from "../models/chart-config.model";
// import { Update } from "@ngrx/entity";

// export const addNewChartConfig = createAction('[Chart Configs] ADD_CONFIG', props<{inputData:IChartConfig}>());
// // export const removeChartConfig = createAction('[Chart Configs] REMOVE_CONFIG', props<{ configId: number }>());
// export const getAllChartConfigs  = createAction('[Chart Configs] UPDATE_CONFIG', props<{list:IChartConfig[]}>());
// export const updateChartConfig = createAction('[Chart Configs] GET_ALL_CONFIGS', props<{inputData:Update<IChartConfig>}>());
// // export const getChartConfig = createAction('[Chart Configs] GET_CONFIG', props<{ configId: number }>());


export const loadChartConfigs=createAction('[chart configs]LoadChartConfigs');
export const loadChartConfigsSuccess=createAction('[chart configs]LoadChartConfigsSuccess', props<{list:IChartConfig[]}>());
export const loadChartConfigsFailed=createAction('[chart configs]LoadChartConfigsFailed', props<{errorMesage:string}>());

export const createChartConfigs=createAction('[chart configs]CreateChartConfigs',props<{inputData: IChartConfig}>());
export const createChartConfigsSuccess=createAction('[chart configs]CreateChartConfigsSuccess', props<{inputData: IChartConfig}>());

export const getChartConfigById=createAction('[chart configs]GetChartConfigById',props<{id: string}>());
export const getChartConfigsByIdSuccess=createAction('[chart configs]GetChartConfigsByIdSuccess', props<{chartConfig: IChartConfig}>());




export const displayAlert=createAction('[Display Alert]', props<{message: string, resultType:string}>());
export const emptyAction=createAction('[Empty Alert]');
import { createReducer, on } from '@ngrx/store';
import { createChartConfigsSuccess, deleteChartConfigsByIdSuccess, getChartConfigsByIdSuccess, loadChartConfigsFailed, loadChartConfigsSuccess, updateChartConfigsSuccess } from './chart-configs.action';
import { ChartConfigsState } from './chart-config.state';

const ChartConfigReducer = createReducer(ChartConfigsState,
    on(loadChartConfigsSuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),

    on(loadChartConfigsFailed, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMesage
        }
    }),

    on(getChartConfigsByIdSuccess, (state, action) => {
        return {
            ...state,
            chartConfigObj: action.chartConfig,
            errorMessage: ''
        }
    }),

    on(createChartConfigsSuccess, (state, action) => {
        return {
            ...state,
            list: [...state.list, action.inputData],
            errorMessage: ''
        }
    }),

    on(updateChartConfigsSuccess, (state, action) => {
        const _newData = state.list.map(x => {
            return x.id == action.inputData.id ? action.inputData : x
        });
        console.log(_newData);
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    }),

    on(deleteChartConfigsByIdSuccess, (state, action) => {
        const _newData = state.list.filter(x=>x.id != action.id)
        console.log(_newData);
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    })
);

export function fnChartConfigReducer(state: any, action: any) {
    return ChartConfigReducer(state, action);
}
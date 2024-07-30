import {createReducer, on} from '@ngrx/store';
import { createChartConfigsSuccess, getChartConfigsByIdSuccess, loadChartConfigsFailed, loadChartConfigsSuccess } from './chart-configs.action';
import { ChartConfigsState } from './chart-config.state';
// import { chartConfigAdapter, chartConfigState } from './chart-config.state';
// import { addNewChartConfig, getAllChartConfigs } from './chart-configs.action';
// const chartConfigReducer = createReducer(chartConfigState, 
//     on(getAllChartConfigs, (state, action)=>{
//         return chartConfigAdapter.setAll(action.list, state);
//     }),
//     on(addNewChartConfig, (state, action)=>{
//         const _maxId=Math.max(...state.ids.map(item => item as number));
//         const _newData = {...action.inputData};
//         _newData.configId = _maxId;
//         return chartConfigAdapter.addOne(_newData, state);
//     })
// )


 const ChartConfigReducer = createReducer(ChartConfigsState,
    on(loadChartConfigsSuccess, (state, action)=>{
        return {
            ...state,
            list: [...action.list],
            errorMessage: ''
        }
    }),

    on(loadChartConfigsFailed, (state, action)=>{
        return {
            ...state,
            list: [],
            errorMessage: action.errorMesage
        }
    }),

    on(getChartConfigsByIdSuccess, (state, action)=>{
        return {
            ...state,
            chartConfigObj: action.chartConfig,
            errorMessage: ''
        }
    }),

    on(createChartConfigsSuccess, (state, action)=>{
        // let _maxId=Math.max(...state.list.map(o=>o.id));
        // if(_maxId>=0){
        //     _maxId =_maxId+1;
        // }
        // else{
        //     _maxId =1;
        // }
        // const _newData={...action.inputData};
        // _newData.id = _maxId;
        // // let updatedData = [...state.list, _newData]
        
        // // console.log(updatedData,_maxId)
       
        return {
            ...state,
            list: [...state.list, action.inputData],
            errorMessage: ''
        }
    })
);

export function fnChartConfigReducer(state: any, action: any){
    return ChartConfigReducer(state, action);
}
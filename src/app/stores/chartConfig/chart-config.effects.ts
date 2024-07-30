import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChartSettingsService } from "../../services/chart-settings/chart-settings-service.service";
import { createChartConfigs, createChartConfigsSuccess, displayAlert, emptyAction, getChartConfigById, getChartConfigsByIdSuccess, loadChartConfigs, loadChartConfigsFailed, loadChartConfigsSuccess } from "./chart-configs.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable()
export class ChartConfigEffects {
    constructor(private actions: Actions,
        private chartSettingsService: ChartSettingsService,
        private snackBar: MatSnackBar) { }

    _loadChartConfigs = createEffect(() =>
        this.actions.pipe(
            ofType(loadChartConfigs),
            exhaustMap((action) => {
                return this.chartSettingsService.GetAllChartConfigList().pipe(
                    map((data) => {
                        return loadChartConfigsSuccess({ list: data })
                    }),
                    catchError((_error) => of(loadChartConfigsFailed({ errorMesage: _error.message })))
                )
            })
        )
    )

    _createChartConfigs = createEffect(() =>
        this.actions.pipe(
            ofType(createChartConfigs),
            switchMap((action) => {
                return this.chartSettingsService.CreateChartConfig(action.inputData).pipe(
                    switchMap((data) => {
                        return of(createChartConfigsSuccess({ inputData: action.inputData }),
                            displayAlert({message:'Created Successfully', resultType:'pass'}))
                    }),
                    catchError((_error) => of(displayAlert({ message: 'Failed to create chart config..!', resultType:'fail' })))
                )
            })
        )
    )
    _getChartConfigById = createEffect(() =>
        this.actions.pipe(
            ofType(getChartConfigById),
            exhaustMap((action) => {
                return this.chartSettingsService.GetChartConfigById(action.id).pipe(
                    map((data) => {
                        
                        return getChartConfigsByIdSuccess({ chartConfig: data })
                    }),
                    catchError((_error) => of(displayAlert({ message: 'Failed to fetch chart config..!', resultType:'fail' })))
                )
            })
        )
    )













    _displayAlert = createEffect(() =>
        this.actions.pipe(
            ofType(displayAlert),
            exhaustMap((action) => {
                return this.popShacBar(action.message, action.resultType)
                    .afterDismissed().pipe(
                        map(() => {
                            return emptyAction();
                        })
                    )
            })
        )
    )


    popShacBar(message: string, resultType: string = 'fail') {
        let className = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar';
        return this.snackBar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: [className]
        });
    }


}
import { Injectable } from '@angular/core';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CommonUtilitiesService {
  constructor() { }
  getDaysBetweenDates(startDate: Date, endDate: Date) {
    const expiredMoment = moment(endDate);
    const currentMoment = moment(startDate);
    return expiredMoment.diff(currentMoment, 'days');
  }

  getDatesListBetweenRange(startDate: Date, endDate: Date) {
    const start = new Date(new Date(startDate));
    let end = new Date(new Date(endDate));
    const date = new Date(start.getTime());
    const dates: string[] = [];

    while (date <= end) {
      dates.push(date.toDateString());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  getRandomNosBetweenRange(min: number, max: number) {
    if (min < 0) {
      return min + Math.random() * (Math.abs(min) + max);
    } else {
      return min + Math.random() * max;
    }
  }
}

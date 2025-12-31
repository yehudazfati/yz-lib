import { Injectable } from '@angular/core';
import { addDays, addMonths, addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, formatDate, getDay, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { CalendarServiceIfc } from './my-calendar/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CalendarFnsService implements CalendarServiceIfc {
  prev(monthDate: Date, view: 'day' | 'month' | 'week'): Date {
    switch (view) {
      case 'day':
        return addDays(monthDate, -1);
      case 'week':
        return addWeeks(monthDate, -1)
    }
    return addMonths(monthDate, -1);
  
  }
  next(monthDate: Date, view: 'day' | 'month' | 'week'): Date {
    switch (view) {
      case 'day':
        return addDays(monthDate, 1);
      case 'week':
        return addWeeks(monthDate, 1)
    }
    return addMonths(monthDate, 1);
  }

  isToday(date: Date): boolean {
    return isSameDay(date, new Date());
  }

  getDayIndex(date: Date): number {
    return getDay(date);
  }
  getDayName(date: Date, format = 'EEEE'): string {
    return formatDate(date, format);
  }
  daysInView(date: Date, view: 'day' | 'month' | 'week'): Date[][] {

    switch (view) {
      case 'day':
        return [[date]];
      case 'week':
        return this.getTheWholeWeek(date);
    }
    return this.getTheWholeMonth(date);
  }

  private getTheWholeMonth(date: Date): Date[][] {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });
    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; ) {
      const day = getDay(days[i]);
      const week = days.slice(i, i + (7-day));
      weeks.push(week);
      i+=week.length;
    }
    return weeks;
  }

  public getTheWholeWeek(date: Date): Date[][] {
    const start = startOfWeek(date);
    const end = endOfWeek(date);
    const days = eachDayOfInterval({ start, end });
    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; ) {
      const day = getDay(days[i]);
      const week = days.slice(i, i + (7-day));
      weeks.push(week);
      i+=week.length;
    }
    return weeks;
  }

  
}



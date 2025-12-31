import { Component, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { CalendarDay } from '../calendar-day/calendar-day';

@Component({
  selector: 'calendar-week',
  template: `<ng-content select='calendar-day'></ng-content>`,
  styles: `
    :host {
      border-bottom: 1px dotted black;
    }
  `
})
export class CalendarWeek {}

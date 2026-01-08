import { Component } from '@angular/core';

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

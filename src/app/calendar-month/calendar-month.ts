import { Component } from '@angular/core';

@Component({
  selector: 'calendar-month',
  template: `
      <ng-content select='calendar-week'></ng-content>
  `,
  styles: ``,
})
export class CalendarMonth {
}

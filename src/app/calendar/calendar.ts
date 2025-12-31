import { Component } from '@angular/core';

@Component({
  selector: 'calendar',
  template: `
    <ng-content select='calendar-navigator'></ng-content>
    <ng-content select='calendar-month'></ng-content>
  `,
  styles: ``,
})
export class Calendar {}

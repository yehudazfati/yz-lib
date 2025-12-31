import { Directive, inject, input } from '@angular/core';
import { TimeNavigatorToken } from './calendar-navigator.tokens';
import { TimeNavigatorIfc } from './calendar-interfaces';

@Directive({
  selector: '[calendarNav]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)'
  }
})
export class CalendarNavDirective {
  timeNavigator = inject<TimeNavigatorIfc>(TimeNavigatorToken, { optional: true}); 
  calendarNav = input.required<'next' | 'prev' | 'today'>();
  
  onClick() {
    if (!this.timeNavigator) console.warn('TimeNavigatorToken not provided');
    this.timeNavigator?.navidate(this.calendarNav())
  };
}

import { Directive, inject, input } from '@angular/core';
import { ViewNavigatorIfc } from './calendar-interfaces';
import { ViewNavigatorToken } from './calendar-navigator.tokens';

@Directive({
  selector: '[calendarViewLink]',
  standalone: true,
  host: {
    '(click)': 'onClick()',
  }
})
export class CalendarViewLinkDirective {
  calendarViewLink = input.required<'day' | 'week' | 'month'>();
  viewSwitcher =  inject<ViewNavigatorIfc>(ViewNavigatorToken, { optional: true});

  onClick() {
    if (!this.viewSwitcher) console.warn('ViewNavigatorToken not provided');
    this.viewSwitcher?.changeView(this.calendarViewLink());
  }
}

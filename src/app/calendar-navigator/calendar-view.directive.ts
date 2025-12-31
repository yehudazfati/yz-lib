import { Directive, HostListener, input, model } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[calendarView]',
  standalone: true
})
export class CalendarViewDirective {
  calendarView = input.required<'day' | 'week' | 'month'>();
  view$ = new Subject<'day' | 'week' | 'month'>();

  @HostListener('click')
  onClick() {
    this.view$.next(this.calendarView());
  }
}

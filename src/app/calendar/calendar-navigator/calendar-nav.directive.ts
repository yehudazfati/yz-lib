import { Directive, HostListener, input } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[calendarNav]',
  standalone: true
})
export class CalendarNavDirective {
  calendarNav = input.required<'next' | 'prev' | 'today'>();
  nav$ = new Subject<'next' | 'prev' | 'today'>();

  @HostListener('click')
  onClick() {
    this.nav$.next(this.calendarNav());
  }
}

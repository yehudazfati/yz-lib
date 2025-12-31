import { AfterContentInit, Component, ContentChildren, inject, model, output, OnDestroy, QueryList, signal, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CalendarServiceToken } from '../../my-calendar/consts';
import { CalendarNavDirective } from './calendar-nav.directive';
import { CalendarViewDirective } from './calendar-view.directive';

@Component({
  selector: 'calendar-navigator',
  template: `
    <ng-content></ng-content>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class CalendarNavigator implements AfterContentInit, OnDestroy, OnInit {
  
  calendarService = inject(CalendarServiceToken);
  currentDate = model<Date>(new Date());
  calendarView = model<'day' | 'week' | 'month'>('month');
  daysInView = output<Date[][]>();
  
  #prevMonth = () => {
    this.currentDate.set(this.calendarService.prev(this.currentDate(), this.calendarView()));
    this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), this.calendarView()));
  };
  #nextMonth = () => {
    this.currentDate.set(this.calendarService.next(this.currentDate(), this.calendarView()))
    this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), this.calendarView()));
  };
  #currentDate = () => {
    this.currentDate.set(new Date())
    this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), this.calendarView()));
  };
  #destroy$ = new Subject<void>();

  @ContentChildren(CalendarViewDirective, { descendants: true }) views!: QueryList<CalendarViewDirective>;
  @ContentChildren(CalendarNavDirective, { descendants: true }) navs!: QueryList<CalendarNavDirective>;
  
  ngOnInit(): void {
    this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), this.calendarView()));
  }
  ngAfterContentInit(): void {
    this.views?.forEach(view => {
      view.view$
        .pipe(takeUntil(this.#destroy$))
        .subscribe((value: 'day' | 'week' | 'month') => {
          this.calendarView.set(value);
          this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), value));
        })
    });

    this.navs?.forEach(view => {
      view.nav$
        .pipe(takeUntil(this.#destroy$))
        .subscribe((value: 'next' | 'prev' | 'today') => {
          switch (value) {
            case 'next':
              this.#nextMonth();
              break;
            case 'prev':
              this.#prevMonth();
              break;
            case 'today':
              this.#currentDate();
          }
        })
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}

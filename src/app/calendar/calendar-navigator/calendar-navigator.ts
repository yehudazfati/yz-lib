import { Component, inject, model, OnInit, output } from '@angular/core';
import { CalendarServiceToken } from '../../my-calendar/consts';
import { TimeNavigatorIfc, ViewNavigatorIfc } from './calendar-interfaces';
import { TimeNavigatorToken, ViewNavigatorToken } from './calendar-navigator.tokens';


@Component({
  providers: [
    {
      provide: TimeNavigatorToken,
      useExisting: CalendarNavigator
    },
    {
      provide: ViewNavigatorToken,
      useExisting: CalendarNavigator
    },
    
  ],
  selector: 'calendar-navigator',
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class CalendarNavigator implements OnInit, TimeNavigatorIfc, ViewNavigatorIfc {

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
  
  ngOnInit(): void {
    this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), this.calendarView()));
  }

  changeView(view: 'day' | 'week' | 'month') {
    this.calendarView.set(view);
    this.daysInView.emit(this.calendarService.daysInView(this.currentDate(), view));
  }

  navidate(value: 'next' | 'prev' | 'today') {
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
  }
}

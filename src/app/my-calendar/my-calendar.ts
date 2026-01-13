import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, model, output, signal } from '@angular/core';
import { CalendarDay } from "../calendar/calendar-day/calendar-day";
import { CalendarFnsService } from '../calendar-event-form/calendar-fns.service';
import { CalendarMonth } from "../calendar/calendar-month/calendar-month";
import { CalendarNavDirective } from '../calendar/calendar-navigator/calendar-nav.directive';
import { CalendarNavigator } from "../calendar/calendar-navigator/calendar-navigator";
import { CalendarViewLinkDirective } from '../calendar/calendar-navigator/calendar-view-link.directive';
import { CalendarWeek } from "../calendar/calendar-week/calendar-week";
import { Calendar } from "../calendar/calendar";
import { CalendarServiceToken, PersistenceServiceToken } from './consts';
import { CalendarEvent } from '../calendar-event-form/calendar-event';

@Component({
  selector: 'my-calendar',
  imports: [Calendar, CalendarMonth, CalendarWeek, CalendarDay, DatePipe, CalendarNavigator, NgClass, CalendarViewLinkDirective, CalendarNavDirective],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarServiceToken,
      useClass: CalendarFnsService
    }
  ],
  styleUrl: './my-calendar.scss',
  template: `
    <calendar>
      <calendar-navigator class="flex-row space-around" [(currentDate)]="currentDate" (daysInView)="daysInView.set($event)" [(calendarView)]="calendarView">
          <div class="flex-row grow-1 justify-start">
            <div class="flex-row space-around grow-2 align-center">
              <button class="nav-button grow-1" calendarNav='prev'>Previous</button>
              <div class="grow-2 justify-center flex-row">{{ currentDate() | date: 'MMMM, y' }}</div>
              <button class="nav-button grow-1" calendarNav='next'>Next</button>
            </div>
            <div class="flex-row space-around grow-1 justify-end">
              <button [disabled]="isToday(currentDate())" class="nav-button" calendarNav='today'>Today</button>
            </div>
          </div>
          <div  class="flex-row grow-1 justify-end space-around">
            <button calendarViewLink='day' [class]="selectedViewCssClass('day')" class="radius-left">Day</button>
            <button calendarViewLink='week' [class]="selectedViewCssClass('week')">Week</button>
            <button calendarViewLink='month' [class]="selectedViewCssClass('month')" class="radius-right">Month</button>
          </div>
      </calendar-navigator>

      <calendar-month>
        <calendar-week class="days-titles week-calendar" [class]='calendarView() + "-view"'>
          @for (dayTitle of daysTitles(); track dayTitle) {
            <calendar-day class="day-calendar">
              {{dayTitle}}
            </calendar-day>
          }
        </calendar-week>
        @for (week of daysInView(); track $index) {
          <calendar-week class="week-calendar" [class]='calendarView() + "-view"'>
            @for (day of week; track day.getTime()) {
            <calendar-day (dayClicked)='dayClickHandler(day);' class="day-calendar seletable" [style]="'grid-column:' + getDay(day)" [ngClass]="{'today': isToday(day), selected: day === selectedDay() }">
              @if (calendarView() === 'month') {
                {{day | date: 'dd'}}
              }
              <div class='flex-column'>
                @for (event of persisteceService.getEventsForDay(day); track event.date.getTime()) {
                  <a (click)="emitClendarEvent(event); $event.stopPropagation()"> 
                    <span>{{ event.title }}</span> 
                    @if (calendarView() === 'week') {
                      <span>{{ event.description }}</span>
                    }
                  </a>
                }
              </div>
            </calendar-day>
            }
          </calendar-week>
        }
      </calendar-month>
</calendar>`
})
export class MyCalendar {

  currentDate = model(new Date());
  selectedDay = signal<Date | undefined>(undefined);
  dayClick = output<Date>();
  eventClick = output<CalendarEvent>();
  calendarView = model<'day' | 'month' | 'week'>('month');
  selectedViewCssClass = (view: string) => view === this.calendarView() ? 'nav-button selected': 'nav-button';
  daysInView = signal<Date[][]>([[]]);
  calendarService = inject(CalendarServiceToken);
  persisteceService = inject(PersistenceServiceToken);
  daysTitles = computed(() => {
    switch (this.calendarView()) {
      case 'week':
        return this.calendarService.getTheWholeWeek(this.daysInView()[0][0])[0].map((day) => this.calendarService.getDayName(day, 'EE, dd'));
      case 'day':
        return [this.calendarService.getDayName(this.daysInView()[0][0], 'EEEE, dd')];
      case 'month':
        return this.calendarService.getTheWholeWeek(this.daysInView()[0][0])[0].map((day) => this.calendarService.getDayName(day));
    }
  });
  getDay = (day: Date) => this.calendarService.getDayIndex(day) + 1;
  isToday = (day: Date) => this.calendarService.isToday(day);
  dayClickHandler = (day: Date) => {
    this.dayClick.emit(day);
    this.selectedDay.set(day);
  };

  emitClendarEvent = (event: CalendarEvent) => {
    this.eventClick.emit(event );
  }
}

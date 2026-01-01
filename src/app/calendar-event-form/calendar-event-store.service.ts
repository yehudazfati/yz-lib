
import { inject, Injectable } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { PersistenceServiceIfc } from '../my-calendar/interfaces';
import { CalendarStore } from './calendar-event.store';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventStoreService implements PersistenceServiceIfc {

  readonly store = inject(CalendarStore);

  getEvents(): CalendarEvent[] {
    return this.store.events();
  }

  save(event: CalendarEvent): void {
    this.store.saveEvent(event);
  }

  deleteEvent(event: CalendarEvent): void {
    this.store.removeEvent(event);
  }

  getEventsForDay(day: Date): CalendarEvent[] {
    return this.store.getEventsForDay(day);
  }
  getEventsForWeek(week: Date): CalendarEvent[] {
    return this.store.getEventsForWeek(week);
  }
  getEventsForMonth(month: Date): CalendarEvent[] {
    return this.store.getEventsForMonth(month);
  }
}

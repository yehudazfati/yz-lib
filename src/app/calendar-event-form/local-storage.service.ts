
import { Injectable } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { PersistenceServiceIfc } from '../my-calendar/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements PersistenceServiceIfc {
  private readonly storageKey = 'calendarEvents';

  deleteEvent(event: CalendarEvent): void {
    throw new Error('Method not implemented.');
  }
  getEventsForDay(day: Date): CalendarEvent[] {
    throw new Error('Method not implemented.');
  }
  getEventsForWeek(week: Date): CalendarEvent[] {
    throw new Error('Method not implemented.');
  }
  getEventsForMonth(month: Date): CalendarEvent[] {
    throw new Error('Method not implemented.');
  }

  getEvents(): CalendarEvent[] {
    const eventsJson = localStorage.getItem(this.storageKey);
    if (eventsJson) {
      const events = JSON.parse(eventsJson);
      // Convert date strings back to Date objects
      return events.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
    }
    return [];
  }

  getEvent(date: Date | null): CalendarEvent | undefined {
    if (!date) return undefined;
    
    const events = this.getEvents();
    return events.find(event => {
      const eventDate = event.date;
      // Compare year, month, and day
      return eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getDate() === date.getDate();
    });
  }

  save(event: CalendarEvent): void {
    const events = this.getEvents();
    events.push(event);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }

  updateEvent(updatedEvent: CalendarEvent): void {
    let events = this.getEvents();
    events = events.map(event => {
      const eventDate = event.date;
      const updatedEventDate = updatedEvent.date;
      if (eventDate.getFullYear() === updatedEventDate.getFullYear() &&
          eventDate.getMonth() === updatedEventDate.getMonth() &&
          eventDate.getDate() === updatedEventDate.getDate()) {
        return updatedEvent;
      }
      return event;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}

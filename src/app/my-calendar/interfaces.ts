import { CalendarEvent } from "../calendar-event-form/calendar-event";

export interface CalendarServiceIfc {
    daysInView(date: Date, view: 'day' | 'month' | 'week'): Date[][];
    prev(monthDate: Date, view: 'day' | 'month' | 'week'): Date;
    next(monthDate: Date, view: 'day' | 'month' | 'week'): Date;
    isToday(date: Date): boolean;
    getDayIndex(date: Date): number;
    getDayName(date: Date, format?: string): string;
    getTheWholeWeek(date: Date): Date[][];
}

export interface PersistenceServiceIfc {
    save(event: CalendarEvent): void;
    deleteEvent(event: CalendarEvent): void;
    getEvents(): CalendarEvent[];
    getEventsForDay(day: Date): CalendarEvent[];
    getEventsForWeek(week: Date): CalendarEvent[];
    getEventsForMonth(month: Date): CalendarEvent[];
}
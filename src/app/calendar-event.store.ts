import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { CalendarEvent } from "./calendar-event";
import { computed } from "@angular/core";
import { isSameDay, isSameMonth, isSameWeek } from "date-fns";
type CalendarState = { events: CalendarEvent[], loading: boolean, error: boolean };
const initialState: CalendarState = {
    events: [],
    loading: false,
    error: false
};
export const CalendarStore = signalStore(
    {
        providedIn: 'root'
    },
    withState(initialState),
    withComputed(({events}) => ({ 
        sortedEvents: computed(() => events().sort((a, b) => a.date.getTime() - b.date.getTime())),
    })),
    withMethods((store) => ({
        getEventsForDay(day: Date): CalendarEvent[] {
            return store.events().filter(e => isSameDay(e.date, day));
        },
        getEventsForWeek(week: Date): CalendarEvent[] {
            return store.events().filter(e => isSameWeek(e.date, week));
        },
        getEventsForMonth(month: Date): CalendarEvent[] {
            return store.events().filter(e => isSameMonth(e.date, month));
        },
        saveEvent(event: CalendarEvent): void {
            const oldEvent = store.events().find((e) => e.date === event.date);
            patchState(store, (state) => ({
                events: !!oldEvent ? state.events.map(e => e.date.getTime() === event.date.getTime() ? event: e) : [...state.events, event]
            }))
        },
        removeEvent(event: CalendarEvent): void {
            patchState(store, (state) => ({
                events: state.events.filter(e => e !== event)
            }))
        }
    }))
);
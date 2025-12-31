import { InjectionToken } from "@angular/core";
import { CalendarServiceIfc, PersistenceServiceIfc } from "./interfaces";

export const CalendarServiceToken = new InjectionToken<CalendarServiceIfc>('CalendarService');
export const PersistenceServiceToken = new InjectionToken<PersistenceServiceIfc>('CalendarService');

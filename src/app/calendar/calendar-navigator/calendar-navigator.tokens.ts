import { InjectionToken } from "@angular/core";
import { TimeNavigatorIfc, ViewNavigatorIfc } from "./calendar-interfaces";

export const TimeNavigatorToken = new InjectionToken<TimeNavigatorIfc>('TimeNavigatorIfc');
export const ViewNavigatorToken = new InjectionToken<ViewNavigatorIfc>('ViewNavigatorIfc');

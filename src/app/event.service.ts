import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CalendarEvent } from "./calendar-event-form/calendar-event";

@Injectable({
    providedIn: 'root'
})
export class EventService {

    http = inject(HttpClient);
    getAll(): Observable<CalendarEvent[]> {
        return this.http.get<CalendarEvent[]>('https://8baf6a12-4850-4e1c-affb-b8f2707dad5f.mock.pstmn.io/getAll')
                .pipe(map((res: any) => {
                    return res.data.map((e: any) => e.date = {...e, date: new Date(e.date)} as CalendarEvent);
                }));
    }
}
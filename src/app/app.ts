import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CalendarEventFormComponent } from "./calendar-event-form.component";
import { CalendarEventStoreService } from './calendar-event-store.service';
import { CalendarStore } from './calendar-event.store';
import { PersistenceServiceToken } from './my-calendar/consts';
import { MyCalendar } from "./my-calendar/my-calendar";

@Component({
  styleUrl: './app.component.scss',
  selector: 'app-root',
  template: `
    <ng-template #createEventContainer>
      <app-calendar-event-form (close)="event.set(undefined)" (saved)="saveEvent($event)" [event]="event()"></app-calendar-event-form>
    </ng-template>
    <ng-container *ngTemplateOutlet="showFormModal ? createEventContainer: null "/>
    <my-calendar (dayClick)="handleDaySelected($event)" (eventClick)="updateEvent($event)"  [(currentDate)]="currentMonth"></my-calendar>
    
    
    
  `,
  imports: [NgTemplateOutlet, MyCalendar, CalendarEventFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CalendarStore,
    {
      provide: PersistenceServiceToken,
      useClass: CalendarEventStoreService
    }],
})
export class App {
  showFormModal = false;
  event = signal<CalendarEvent | undefined>(undefined);
  daySelected = signal<Date | undefined>(undefined);
  currentMonth = signal<Date>(new Date());
  readonly persisteceService = inject(PersistenceServiceToken);

  constructor() {
    effect(() => {
      if (!!this.event()) {
        this.showFormModal = true;
      } else {
        this.showFormModal = false;
      }
      console.log('current month:', this.currentMonth());
    });
  }

  updateEvent(eventToUpdate: CalendarEvent) {
    this.event.set(eventToUpdate);
  }

  handleDaySelected = (day: Date) => {
    this.event.set({
      date: day,
      title: '',
      description: ''
    });
  }

  saveEvent = (event: CalendarEvent | any) => {
    this.persisteceService.save(event);
    this.event.set(undefined);
  }

  deleteDay = (event: CalendarEvent) => {
    this.persisteceService.deleteEvent(event);
  }
}

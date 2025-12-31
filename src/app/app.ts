import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CalendarEventFormComponent } from "./calendar-event-form.component";
import { CalendarEventStoreService } from './calendar-event-store.service';
import { CalendarStore } from './calendar-event.store';
import { Modal } from "./modal/modal";
import { PersistenceServiceToken } from './my-calendar/consts';
import { MyCalendar } from "./my-calendar/my-calendar";
import { CloseModalDirective } from "./modal/close-modal.directive";

@Component({
  styleUrl: './app.component.scss',
  selector: 'app-root',
  template: `
    <modal [(showModal)]="showFormModal">
      <a closeModal> X </a>
      <calendar-event-form (saved)="saveEvent($event)" [event]="event()"></calendar-event-form>
    </modal>
    <my-calendar (dayClick)="handleDaySelected($event)" (eventClick)="updateEvent($event)"  [(currentDate)]="currentMonth"></my-calendar>
  `,
  imports: [MyCalendar, CalendarEventFormComponent, Modal, CloseModalDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CalendarStore,
    {
      provide: PersistenceServiceToken,
      useClass: CalendarEventStoreService
    }],
})
export class App {
  showFormModal = signal(false);
  event = signal<CalendarEvent | undefined>(undefined);
  daySelected = signal<Date | undefined>(undefined);
  currentMonth = signal<Date>(new Date());
  readonly persisteceService = inject(PersistenceServiceToken);

  constructor() {
    effect(() => {
      if (!!this.event()) {
        this.showFormModal.set(true);
      } else {
        this.showFormModal.set(false);
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

import { DatePipe } from '@angular/common';
import { afterRenderEffect, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarEvent } from './calendar-event';

@Component({
  selector: 'calendar-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  template: `
    <form  [formGroup]="calendarEventForm" (ngSubmit)="save()">
      <p>{{calendarEventForm.status}}</p>
      <div class="form-header">
        <span class="title">Create Event for {{event()?.date | date: 'EEEE, MMMM d, y'}}</span>
      </div>
      <div class="fields-layout">
        <div class="row-fields-layout">
          <label for="title">Title:</label>
          <input id="title" name="title" type="text" formControlName="title"> 
            @if(calendarEventForm.controls.title.invalid && (calendarEventForm.controls.title.dirty || calendarEventForm.controls.title.touched)) {
              @if (calendarEventForm.controls.title.hasError('required')) {
                <span class="error">Event Title is required.</span>
              }
            }
        </div>
        <div class="row-fields-layout">
          <label for="description">Description:</label>
          <textarea id="description" name="description" type="text" formControlName="description"></textarea>
          <!-- @if(description.invalid && (description.dirty || description.touched)) {
              <span>
              @if (description.hasError('maxlength')) {
                <div>description must be max  5 characters long..</div>
              }
              </span>
            } -->
        </div>
      </div>
      <button type="submit" [disabled]="calendarEventForm.status !== 'VALID'">Save</button>
    </form>
  `,
  styleUrl: './calendar-event-form.scss'
})
export class CalendarEventFormComponent {
  saved = output<CalendarEvent>();
  event = input<CalendarEvent>();
  #formBuilder = inject(FormBuilder);
  calendarEventForm = this.#formBuilder.group({
    title: [this.event()?.title??'', Validators.required],
    description: [this.event()?.description ?? '', Validators.maxLength(5)]
  });
  
  constructor() {
    afterRenderEffect(() => {
      this.calendarEventForm.setValue({
        title: this.event()?.title ?? '',
        description: this.event()?.description ?? ''
      });
    });
  }
  
  save() {
    this.saved.emit({...this.calendarEventForm.value, date: this.event()?.date} as CalendarEvent);
  }
}

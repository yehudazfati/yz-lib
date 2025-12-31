import { DatePipe } from '@angular/common';
import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent } from './calendar-event';

@Component({
  selector: 'calendar-event-form',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <form (ngSubmit)="save()">
      <div class="form-header">
        <span class="title">Create Event for {{event()?.date | date: 'EEEE, MMMM d, y'}}</span>
      </div>
      <div class="fields-layout">
        <div class="row-fields-layout">
          <label for="title">Title:</label>
          <input type="text" id="title" [ngModel]="event()?.title" (ngModelChange)="updateTitle($event)" name="title" required>
        </div>
        <div class="row-fields-layout">
          <label for="description">Description:</label>
          <textarea type="text" id="description" [ngModel]="event()?.description" (ngModelChange)="updateDescription($event)" name="description"></textarea>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  `,
  styles: [`
    
    .form-header {
      display: flex;
      flex-flow: row;
      justify-content: space-between;

      .title {
        font-size: 14px;
        font-weight: bold;
      }
    }

    .fields-layout {
      display: grid;

      .row-fields-layout {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: repeat(2, auto auto);
        row-gap: 4px;
      }

      textarea {
        min-height: 150px;
      }
    }

    form {
      min-width: 50%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: white;
      height: fit-content;
      width: fit-content;
    }
  `]
})
export class CalendarEventFormComponent {
  saved = output<CalendarEvent>();
  event = model<CalendarEvent | undefined>();

  save() {
    this.saved.emit(this.event() as CalendarEvent);
  }

  updateTitle(title: any) {
    this.event.update(e => ({
      ...e,
      title: title
    } as CalendarEvent));
  }

  updateDescription(description: any) {
    this.event.update(e => ({
      ...e,
      description: description
    } as CalendarEvent));
  }
}

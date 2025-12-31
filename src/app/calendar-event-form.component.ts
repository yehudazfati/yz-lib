import { DatePipe } from '@angular/common';
import { Component, effect, HostListener, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarEvent } from './calendar-event';

@Component({
  selector: 'app-calendar-event-form',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <form (ngSubmit)="save()">
      <div class="form-header">
        <span class="title">Create Event for {{event()?.date | date: 'EEEE, MMMM d, y'}}</span>
        <a class="close-button" (click)='close.emit()'> X </a>
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
    <div class="backdrop"></div>
  `,
  styles: [`
    .backdrop {
      position: fixed; 
      background: #d3d3d39e; 
      opacity: 0.9; 
      top: 0; 
      bottom: 0; 
      left: 0; 
      right: 0; 
      height: 100%; 
      z-index: 1;
    }
    .close-button {
      cursor: pointer;
    }
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
      position: fixed !important;
      margin: auto;
      min-width: 50%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      z-index: 2;
      background: white;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: fit-content;
      width: fit-content;
    }
  `]
})
export class CalendarEventFormComponent {
  close = output<void>();
  saved = output<CalendarEvent>();
  event = model<CalendarEvent | undefined>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: Event) {
    console.log('ESC pressed', event);
    this.close.emit();
  }

  constructor() {
    effect(() => {
      console.log('CalendarEventFormComponent blbla', this.event());
    });
  }

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

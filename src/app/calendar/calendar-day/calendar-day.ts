import { Component, output } from '@angular/core';

@Component({
  selector: 'calendar-day',
  template: `<ng-content></ng-content>`,
  host: {
    '(click)': 'onClick()'
  }
})
export class CalendarDay {
  dayClicked = output<void>();

  onClick() {
    this.dayClicked.emit();
  }
}

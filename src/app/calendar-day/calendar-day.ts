import { Component, HostListener, output, signal } from '@angular/core';

@Component({
  selector: 'calendar-day',
  imports: [],
  template: `
    {{dayTitle()}}
    <ng-content></ng-content>
  `,
  styles: ``,
})
export class CalendarDay {
  dayTitle = signal<string>('');
  dayClicked = output<void>();

  @HostListener('click')
  onClick() {
    this.dayClicked.emit();
  }
}

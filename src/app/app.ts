import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
@Component({
  styleUrl: './app.component.scss',
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent],
  template: `<app-tabs></app-tabs>`,
  host: {
    class: 'fill-height flex-row'
  }
})
export class App {}

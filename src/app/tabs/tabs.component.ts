import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  host: {
    class: 'fill-height flex-row grow-1'
  },
  template: `
    <nav class="flex-column space-around">
      <a routerLink="/calendar">Calendar</a>
      <a routerLink="/file-tree" routerLinkActive="active">File Tree</a>
    </nav>
    <div class="grow-1"><router-outlet/></div>
  `,
  styleUrl: './tabs.component.css'
})
export class TabsComponent {}

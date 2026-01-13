import { ChangeDetectionStrategy, Component, linkedSignal, signal } from '@angular/core';
import { Theme } from '../theme.directive';

@Component({
  selector: 'app-file-tree',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Theme],
  template: `

  @switch(signal12()) {
    @case ('admin') {
      <p theme="dark">
        Admin
      </p>
    }
    @case('user') {
      <p>
        User
      </p>
    }
    @default {
      <p>
        Default
      </p>
    }
  }

  @if (signal1() === 'admin') {
    <p>
      Admin
    </p>
  } @else if (signal1() === 'user'){
    <p>
      user
    </p>
  } @else {
    <p>
      Default
    </p>
  }
  
    
  `,
  styleUrl: './file-tree.component.css'
})
export class FileTreeComponent {

  readonly signal1 = signal('user');
  readonly signal12 = linkedSignal(() => this.signal1() + ' 2');
  constructor() {}
}

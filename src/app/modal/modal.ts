import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, Component, contentChild, model } from '@angular/core';
import { CloseModalDirective } from './close-modal.directive';
import { ModalToken } from './modal.consts';
import { ModalIfc } from './modal.interfaces';

@Component({
  selector: 'modal',
  providers: [{
    provide: ModalToken,
    useExisting: Modal
  }],
  imports: [NgTemplateOutlet],
  standalone: true,
  template: `
    <ng-template #createEventContainer>
      <div class='modal-content'>
        <ng-content></ng-content>
      </div>
      <div class="backdrop"></div>
    </ng-template>
    <ng-container *ngTemplateOutlet="showModal() ? createEventContainer: null "/>
  `,
  styleUrl: `./modal.scss`,
  host: {
    '(document:keydown.escape)': 'onEscPressed($event)'
  }
})
export class Modal implements ModalIfc {
  showModal = model<boolean>(false);
  onEscPressed(event: Event) {
    console.log('ESC pressed', event);
    this.showModal.set(false);
  }
  closeButton = contentChild(CloseModalDirective, { descendants: true })
  constructor() {
    afterNextRender(() => {
      this.closeButton()?.addClass('close-button');
    })
  }

  public closeModal() {
    this.showModal.set(false);
  }
}

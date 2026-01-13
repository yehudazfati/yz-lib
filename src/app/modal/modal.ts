import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  modalClosed = output<void>();
  onEscPressed(event: Event) {
    console.log('ESC pressed', event);
    this.closeModal();
  }

  public closeModal() {
    this.showModal.set(false);
    this.modalClosed.emit();
  }
}

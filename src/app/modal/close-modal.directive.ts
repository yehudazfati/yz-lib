import { afterRenderEffect, Directive, ElementRef, inject } from "@angular/core";
import { ModalToken } from "./modal.consts";
import { ModalIfc } from "./modal.interfaces";

@Directive({
    standalone: true,
    selector: '[closeModal]',
    exportAs: 'closeModal',
    host: {
        '(click)': 'onClick()',
        'class': 'close-button'
    }
})
export class CloseModalDirective {
    modal = inject<ModalIfc>(ModalToken, { optional: true});
    host = inject(ElementRef);

    onClick() {
        if (!this.modal) console.warn('ModalToken not provided');
        this.modal?.closeModal();
    }

    constructor() {
        afterRenderEffect({
            earlyRead: (cleanupFn) => {
              const el = this.host.nativeElement;
              return el.getBoundingClientRect();
            },
            write: (previousPhaseValue, cleanupFn) => {
              console.log('value from erly read: ' + JSON.stringify(previousPhaseValue()));
            },
            mixedReadWrite: (previousPhaseValue, cleanupFn) => {
            },
            read: (previousPhaseValue, cleanupFn) => {
            },
          });
    }
}
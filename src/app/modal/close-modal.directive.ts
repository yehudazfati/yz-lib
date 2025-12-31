import { Directive, ElementRef, inject, Renderer2 } from "@angular/core";
import { ModalToken } from "./modal.consts";
import { ModalIfc } from "./modal.interfaces";

@Directive({
    standalone: true,
    selector: '[closeModal]',
    exportAs: 'closeModal',
    host: {
        '(click)': 'onClick()'
    }
})
export class CloseModalDirective {
    modal = inject<ModalIfc>(ModalToken, { optional: true});
    host = inject(ElementRef);
    renderer = inject(Renderer2);
    
    onClick() {
        if (!this.modal) console.warn('ModalToken not provided');
        this.modal?.closeModal();
    }

    public addClass(cssClass: string): void {
        const hasClass = this.host.nativeElement.classList.contains(cssClass);
        if (!hasClass) {
            this.renderer.addClass(this.host.nativeElement, cssClass);
        }
    }
}
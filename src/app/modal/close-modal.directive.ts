import { Directive, ElementRef, HostListener, inject, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
    standalone: true,
    selector: '[closeModal]',
    exportAs: 'closeModal'
})
export class CloseModalDirective {
    close$ = new Subject<void>();
    host = inject(ElementRef);
    renderer = inject(Renderer2);
    @HostListener('click') 
    clickHandler() {
        this.close$.next();
    }

    public addClass(cssClass: string): void {
        const hasClass = this.host.nativeElement.classList.contains(cssClass);
        if (!hasClass) {
            this.renderer.addClass(this.host.nativeElement, cssClass);
        }
    }

}
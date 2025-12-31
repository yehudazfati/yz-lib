import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ContentChildren, HostListener, model, OnDestroy, OnInit, QueryList } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CloseModalDirective } from './close-modal.directive';

@Component({
  selector: 'modal',
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
})
export class Modal implements AfterContentInit, OnDestroy, OnInit {
  destroy$ = new Subject<void>();
  showModal = model<boolean>(false);
  @ContentChild(CloseModalDirective, { descendants: true, static: true }) closeModalDirective!: CloseModalDirective;
  @HostListener('document:keydown.escape', ['$event'])
  
  onEscPressed(event: Event) {
    console.log('ESC pressed', event);
    this.showModal.set(false);
  }

  ngOnInit(): void {
    this.closeModalDirective.addClass('close-button');
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.closeModalDirective?.close$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.showModal.set(false);
    });
  }
}

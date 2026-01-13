import { Directive, effect, input } from "@angular/core";

@Directive({
    selector: '[theme]',
    standalone: true
  })
  export class Theme {
    // Create an input that accepts 'light' or 'dark`, defaulting to 'light'.
    theme = input<'light' | 'dark'>('light');
    constructor() {
      effect(() => {
        console.log('mode: ' + this.theme());
      })
    }
  }
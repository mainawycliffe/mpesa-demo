import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen w-screen flex flex-col justify-center items-center">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}

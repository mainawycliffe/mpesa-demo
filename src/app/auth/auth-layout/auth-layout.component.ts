import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="flex flex-col w-full md:w-[40rem] mx-auto py-6 px-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="h-screen w-screen flex flex-col px-4 py-6">
      <div
        class="w-full flex flex-row p-4 items-end justify-end lg:w-2/3 mx-auto"
      >
        <a
          routerLink="/auth"
          class="bg-blue-500 text-white shadow-lg px-4 py-2 rounded-lg text-xl font-semibold"
        >
          Sign In/Up
        </a>
      </div>
      <div
        class="flex flex-1 flex-col justify-center items-center space-y-5 p-5"
      >
        <img
          src="/assets/photo.png"
          alt="photo"
          class="w-full md:w-[30rem] py-4"
        />
        <h3 class="text-4xl tracking-wide">
          Making Transaction Businesses Faster, Convenient and Secure
        </h3>
        <p class="text-2xl">
          Create your account today and get started sending money
        </p>
        <a
          routerLink="/auth"
          class="bg-blue-500 text-white shadow-lg px-4 py-2 rounded-lg text-xl font-semibold"
        >
          Sign In/Up
        </a>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

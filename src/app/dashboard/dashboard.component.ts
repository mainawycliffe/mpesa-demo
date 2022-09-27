import { Component, OnInit } from '@angular/core';
import { AuthSessionService } from '../auth/auth-session.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="h-screen w-screen flex flex-col">
      <div
        class="w-full bg-blue-500 text-white text-xl px-4 py-4 flex flex-row"
      >
        <div class="flex p-2">Dashboard</div>
        <div class="flex flex-row flex-1 p-2 justify-end">
          <button (click)="logout()" class="text-white">Logout</button>
        </div>
      </div>
      <div class="flex flex-col flex-1 py-6 px-4 ">
        <div class="flex flex-col w-full max-w-[50rem] mx-auto">
          <div class="flex flex-col w-full p-2 md:text-center">
            <app-view-balance></app-view-balance>
          </div>
          <div class="flex flex-col w-full p-2">
            <app-top-up></app-top-up>
          </div>
          <div class="flex flex-col w-full p-2">
            <app-send-money></app-send-money>
          </div>
        </div>
      </div>
      <div
        class="block py-8 px-4 text-center bg-blue-500 text-white font-semibold"
      >
        ©️ 2022. All Rights Reserved.
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthSessionService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}

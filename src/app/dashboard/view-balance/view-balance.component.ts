import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, switchMap } from 'rxjs';
import { TopUpService } from 'src/app/top-up.service';

@Component({
  selector: 'app-view-balance',
  template: `
    <div
      class="flex flex-col w-full bg-blue-50 text-black rounded-lg py-8 px-6 shadow-md space-y-4 "
    >
      <div class="w-full font-semibold text-lg uppercase text-gray-800">
        Current Balance
      </div>
      <div class="w-full text-4xl md:text-5xl font-bold">
        {{ balance$ | async | currency }}
      </div>
    </div>
  `,
  styles: [],
})
export class ViewBalanceComponent implements OnInit {
  balance$: Observable<number>;

  constructor(
    private topUpService: TopUpService,
    private firebaseAuth: AngularFireAuth
  ) {
    this.balance$ = this.firebaseAuth.user.pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error('User not logged in!');
        }
        return this.topUpService.getBalance(user?.uid);
      }),
      map((balance) => {
        return balance[0]['balance'] as number;
      })
    );
  }

  ngOnInit(): void {}
}

import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { TopUpService } from 'src/app/top-up.service';

@Component({
  selector: 'app-top-up',
  template: `
    <form #topUpForm="ngForm" (submit)="onTopUp(topUpForm.value)">
      <div
        class="flex flex-col w-full bg-blue-50 text-black rounded-lg py-8 px-6 shadow-md space-y-4 "
      >
        <div class="w-full font-semibold text-lg uppercase text-gray-800">
          Top-up Account
        </div>
        <div class="w-full flex flex-row">
          <div
            class="border rounded-lg rounded-r-none border-r-0 border-gray-600 text-2xl p-4 font-bold"
          >
            $
          </div>
          <div class="flex flex-1 border border-gray-600 border-r-0 border-l-0">
            <input
              type="number"
              class="w-full py-2 px-4 text-center bg-transparent font-semibold text-2xl appearance-none"
              ngModel
              name="amount"
              value="0"
            />
          </div>
          <button
            class="text-white px-4 py-2 border cursor-pointer border-gray-600 rounded-md rounded-l-none border-l-0 text-2xl"
            type="submit"
          >
            💾
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class TopUpComponent {
  @ViewChild('topUpForm') topUpForm!: NgForm;

  constructor(
    private topUpService: TopUpService,
    private firebaseAuth: AngularFireAuth
  ) {}

  async onTopUp({ amount }: TopUpFormModel) {
    const currentUserID = await this.firebaseAuth.currentUser?.then(
      (user) => user?.uid
    );
    if (currentUserID) {
      this.topUpService.topUpCurrentUser(currentUserID, amount).subscribe({
        next: (data) => {
          console.log(data);
          this.topUpForm.reset();
          this.topUpForm.setValue({ amount: 0 });
        },
        error: (error) => {
          console.error(error);
          alert('Top-up failed!');
        },
      });
    }
  }
}

type TopUpFormModel = {
  amount: number;
};

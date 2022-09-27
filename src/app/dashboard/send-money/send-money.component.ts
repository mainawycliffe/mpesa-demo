import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { SendMoneyService } from 'src/app/send-money.service';

@Component({
  selector: 'app-send-money',
  template: `
    <form #sendMoneyForm="ngForm" (submit)="onSendMoney(sendMoneyForm.value)">
      <div
        class="flex flex-col w-full bg-blue-50 text-black rounded-lg py-8 px-6 space-y-4 "
      >
        <div class="w-full font-semibold text-lg uppercase text-gray-800">
          Send money
        </div>
        <div class="flex flex-col w-full space-y-2">
          <label class="uppercase" for="email"> Recipient Email Address </label>
          <input
            type="email"
            id="email"
            name="email"
            email
            class="border border-gray-600 px-4 py-3 rounded-md text-xl placeholder:text-2xl placeholder:font-semibold"
            placeholder="Email"
            required
            ngModel
            #email="ngModel"
          />
          <ng-container *ngIf="email.hasError('required') && email.touched">
            <p class="text-red-500 text-base">Email is required</p>
          </ng-container>
          <ng-container *ngIf="email.hasError('email') && email.touched">
            <p class="text-red-500 text-base">Email must be valid</p>
          </ng-container>
        </div>
        <div class="w-full flex flex-col space-y-2">
          <label class="uppercase " for="amount"> Amount to send </label>
          <input
            type="number"
            class="w-full py-2 px-4 text-xl border border-gray-600 rounded-lg appearance-none placeholder:text-2xl placeholder:font-semibold"
            ngModel
            #amount="ngModel"
            id="amount"
            name="amount"
            required
            value="0"
            placeholder="Amount"
          />
          <ng-container *ngIf="amount.hasError('required') && amount.touched">
            <p class="text-red-500 text-base">Amount is required</p>
          </ng-container>
        </div>
        <div class="w-full flex flex-col space-y-2">
          <button
            [disabled]="!sendMoneyForm.valid"
            class="w-full py-2 px-4 text-xl border border-gray-600 enabled:bg-blue-500 enabled:text-white rounded-lg appearance-none placeholder:text-2xl placeholder:font-semibold"
            type="submit"
          >
            Send Money
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [],
})
export class SendMoneyComponent {
  @ViewChild('sendMoneyForm') sendMoneyForm!: NgForm;

  constructor(
    private sendMoney: SendMoneyService,
    private firebaseAuth: AngularFireAuth
  ) {}

  async onSendMoney({ amount, recipient }: SendMoneyFormModel) {
    const currentUserID = await this.firebaseAuth.currentUser?.then(
      (user) => user?.uid
    );
    if (currentUserID) {
      this.sendMoney
        .deductMoneyFromUserAccount(currentUserID, amount)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.sendMoneyForm.reset();
            this.sendMoneyForm.setValue({ amount: 0 });
          },
          error: (error) => {
            console.error(error);
            alert('Send money failed failed!');
          },
        });
    }
  }
}

type SendMoneyFormModel = {
  amount: number;
  recipient: string;
};

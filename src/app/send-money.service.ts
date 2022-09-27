import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, switchMap, take } from 'rxjs';
import { TopUpService } from './top-up.service';

@Injectable({
  providedIn: 'root',
})
export class SendMoneyService {
  constructor(
    private afFirestore: AngularFirestore,
    private topUpService: TopUpService
  ) {}

  /**
   * Add transaction withdrawing money from the current user and depositing money to the recipient
   */
  deductMoneyFromUserAccount(fromUserID: string, amount: number) {
    return this.topUpService.getBalance(fromUserID).pipe(
      take(1),
      map((balanceList) => {
        if (balanceList.length === 0) {
          return 0;
        }
        return balanceList[0]['balance'] as number;
      }),
      map((balance) => {
        if (balance < amount) {
          throw new Error('Insufficient balance');
        }
        return balance;
      }),
      // update balance
      switchMap((balance) => {
        return from(
          this.afFirestore
            .collection('user')
            .doc(fromUserID)
            .collection('balance')
            .add({
              id: this.afFirestore.createId(),
              userID: fromUserID,
              balance: balance - amount,
              date: new Date(),
            })
        );
      })
    );
  }
}

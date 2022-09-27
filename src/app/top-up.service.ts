import { Injectable } from '@angular/core';
import { map, from, switchMap, take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TopUpService {
  constructor(private firestore: AngularFirestore) {}

  getBalance(userID: string) {
    return this.firestore
      .collection('user')
      .doc(userID)
      .collection('balance', (ref) => ref.orderBy('date', 'desc').limit(1))
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((d) => {
            return {
              id: d.payload.doc.id,
              ...d.payload.doc.data(),
            } as Record<string, unknown>;
          });
        })
      );
  }

  topUpCurrentUser(userID: string, amount: number) {
    //always narrow
    return this.getBalance(userID).pipe(
      take(1),
      map((balanceList) => {
        if (balanceList.length === 0) {
          return 0;
        }
        return balanceList[0]['balance'] as number;
      }),
      // update balance
      switchMap((balance) => {
        return from(
          this.firestore
            .collection('user')
            .doc(userID)
            .collection('balance')
            .add({
              id: this.firestore.createId(),
              userID: userID,
              balance: balance + amount,
              date: new Date(),
            })
        );
      })
    );
  }
}

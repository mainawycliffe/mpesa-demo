import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.router.navigate(['/auth/signin']);
  }
}

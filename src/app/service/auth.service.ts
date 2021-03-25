import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userCredential: firebase.auth.UserCredential;

  constructor(
    private auth: AngularFireAuth,
    private storage: LocalStorageService
  ) {}
  login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userCredential = userCredential;
        this.storage.set({ key: 'auth', payload: userCredential });
        return this.userCredential;
      });
  }

  logout() {
    return this.auth.signOut();
  }

  getUserCredential() {
    return this.userCredential;
  }

  setLocalStorage() {}
}

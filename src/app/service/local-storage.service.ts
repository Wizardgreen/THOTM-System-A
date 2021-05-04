import { Injectable } from '@angular/core';

interface Param {
  key: string;
  payload: any;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  appName = 'THOTM-SYSTEM_A';

  data: { [key: string]: any } = {};

  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): string {
    if (this.data[key]) {
      return this.data[key];
    }
    return null;
  }
  set(param: Param): void {
    const { key, payload } = param;
    localStorage.setItem(
      this.appName,
      JSON.stringify({ ...this.data, [key]: payload })
    );
  }
}

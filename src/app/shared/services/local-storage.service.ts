import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }


  readLocalStorage(item) {
    return localStorage.item;
  }

  setLocalStorage(item,value) {
    return localStorage.setItem(item,value);
  }
}

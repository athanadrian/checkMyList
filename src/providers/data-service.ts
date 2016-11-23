import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor(public storage: Storage) {
  }
  getData(): Promise<any> {
    return this.storage.get('checklists');
  }
  save(data): void {
    let saveData = [];
    //Remove observables
    data.forEach((checklist) => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });
    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }
}



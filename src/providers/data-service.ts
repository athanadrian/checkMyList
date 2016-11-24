import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  constructor(public storage: Storage) {
    //Storage will store data in a native SQLite db if is avaliable
    // if SQlite is not avaliable when app is running natively on a device storage will use IndexedDB, WebSQL, or localstorage.
  }

  getData(): Promise<any> {
    //return data in the form of a promise
    return this.storage.get('checklists');
  }

  //function that actually saves data into storage
  save(data): void {
    let saveData = [];
    
    data.forEach((checklist) => {
      //Remove observable stuff
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });
    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }
}



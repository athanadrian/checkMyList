import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';


//import { ChecklistModel } from '../../models/checklist-model';
/*
  Generated class for the Checklist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {

  checklist: any;

  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams) {
    this.checklist = this.navParams.get('checklist');
  }

  ionViewDidLoad() {
    
  }
  //add button
  addItem(): void {
    let alert = this.alertController.create({
      title: 'Προσθήκη εργασίας',
      message: 'Όνομα εργασίας για την λίστα ' + this.checklist.title + '.',
      inputs: [
        {
          name: 'itemName'
        }
      ],
      buttons: [
        {
          text: 'Άκυρο'
        },
        {
          text: 'Αποθήκευση',
          handler: data => {
            this.checklist.addItem(data.itemName);
          }
        }
      ]
    });
    alert.present();
  }
  //delete sliding button
  removeItem(item): void {
    this.checklist.removeItem(item);
  }
  //edit sliding button
  renameItem(item): void {
    let alert = this.alertController.create({
      title: 'Αλλαγή ονομασίας εργασίας.',
      message: 'Δώσε νέο όνομα για την εργασία της λίστας ' + this.checklist.title + '.',
      inputs: [
        {
          name: 'itemName'
        }
      ],
      buttons: [
        {
          text: 'Άκυρο'
        },
        {
          text: 'Αποθήκευση',
          handler: data => {
            this.checklist.renameItem(item, data.itemName);
          }
        }
      ]
    });
    alert.present();
  }

  toggleItem(item): void {
    this.checklist.toggleItem(item);
  }

  //refresh button
  refreshList(): void {
    this.checklist.items.forEach((item) => {
      if (item.checked) {
        this.checklist.toggleItem(item);
      }
    });
  }

}

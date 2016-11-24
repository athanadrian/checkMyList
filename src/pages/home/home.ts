import { Component } from '@angular/core';

import { NavController, AlertController, Platform } from 'ionic-angular';

import { ChecklistPage } from '../checklist/checklist';
import { IntroPage } from '../intro/intro';

import { DataService } from '../../providers/data-service';
import { ChecklistModel } from '../../models/checklist-model';
import { Storage } from '@ionic/storage';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController,
    public dataService: DataService,
    public alertController: AlertController,
    public platform: Platform,
    public storage: Storage) {

  }

  //loading Data from storage whenever the user opens the application
  ionViewDidLoad() {
    //call will execute after the device(platform) is ready
    this.platform.ready().then(() => {
      //check if intro page has displayed before through introShown
      this.storage.get('introShown').then((result)=>{
        //if is the first time open application
        if(!result){
          //initialize introShown to true into storage
          this.storage.set('introShown', true);
          //navigate to int page
          this.navCtrl.setRoot(IntroPage)
        }
      });
      //call to getData which returns a Promise so we can access data when they are ready
      this.dataService.getData().then((checklists) => {
        let savedChecklists: any = false;
        if (typeof (checklists) != "undefined") {
          //decode the json string into array so we can work with
          savedChecklists = JSON.parse(checklists);
        }
        if (savedChecklists) {
          //loop through arrray
          savedChecklists.forEach((savedChecklist) => {
            //and create new checklist to use all the helper functions we made on the model
            let loadChecklist = new ChecklistModel
            (
              savedChecklist.title,
              savedChecklist.items
            );
            this.checklists.push(loadChecklist);
            //setup listener for observable
            loadChecklist.checklist.subscribe(update => {
              this.save();
            });
          });
        }
      });
    });
  }

  //Add button
  addChecklist(): void {
    console.log('Adding checklist.....');
    let alert = this.alertController.create({
      title: 'Νέα λίστα',
      message: 'Δώστε όνομα για τη νέα λίστα:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Άκυρο'
        },
        {
          text: 'Αποθήκευση',
          handler: data => {
            let newChecklist = new ChecklistModel(data.title, []);
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => {
              this.save();
            });
            this.save();
          }
        }
      ]
    });
    alert.present();
  }

  //edit sliding button
  renameChecklist(checklist): void {
    console.log('Renaming checklist.....');
    let alert = this.alertController.create({
      title: 'Αλλαγή ονόματος λίστας',
      message: 'Δώστε νέο όνομα για τη λίστα:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Άκυρο'
        },
        {
          text: 'Αποθήκευση',
          handler: data => {
            let index = this.checklists.indexOf(checklist);

            if (index > -1) {
              this.checklists[index].setTitle(data.name);
              this.save();
            }
          }
        }
      ]
    });
    alert.present();
  }

  //list button
  viewChecklist(checklist): void {
    console.log('Viewing checklist.....');
    this.navCtrl.push(ChecklistPage, { checklist: checklist });
  }

  //delete sliding button
  removeChecklist(checklist): void {
    console.log('Removing checklist.....');
    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }
  }

  //save function
  save(): void {
    Keyboard.close();
    console.log('Checklist saved.....');
    this.dataService.save(this.checklists);
  }
}

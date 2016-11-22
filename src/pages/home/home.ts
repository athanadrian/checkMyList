import { Component } from '@angular/core';

import { NavController, AlertController, Platform } from 'ionic-angular';

import { DataService } from '../../providers/data-service';
import { ChecklistModel } from '../../models/checklist-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController,
    public dataService: DataService,
    public alertController: AlertController,
    public platform: Platform) {

  }

  ionViewDidLoad(){

  }

  addChecklist(){
    console.log('Adding checklist.....');
  }

  renameChecklist(checklist){
    console.log('Renaming checklist.....');
  }

  viewChecklist(checklist){
    console.log('Viewing checklist.....');
  }

  removeChecklist(checklist){
    console.log('Removing checklist.....');
  }

  save():void{
    console.log('Checklist saved.....');
  }
}

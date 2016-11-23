import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChecklistApp } from './app.component';
import { HomePage, ChecklistPage, IntroPage } from '../pages/pages';

import { DataService} from '../providers/data-service';

@NgModule({
  declarations: [
    ChecklistApp,
    HomePage, ChecklistPage, IntroPage
  ],
  imports: [
    IonicModule.forRoot(ChecklistApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChecklistApp,
    HomePage, ChecklistPage, IntroPage
  ],
  providers: [DataService, Storage]
})
export class AppModule {}

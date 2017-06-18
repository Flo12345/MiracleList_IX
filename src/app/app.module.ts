import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as moment from 'moment';
import 'moment/locale/de';
import { MomentModule } from 'angular2-moment/moment.module';

import { MiracleListProxy } from '../Services/MiracleListProxy';
import { ImportancePipe } from '../Util/ImportancePipe';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportancePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule
  ],
  providers: [ MiracleListProxy ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    moment.locale( window.navigator.language );
  }
}

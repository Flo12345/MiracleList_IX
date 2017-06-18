import { Component } from '@angular/core';
import { MiracleListProxy } from '../Services/MiracleListProxy';
import { Category, Task, SubTask, Importance, LoginInfo } from '../Services/MiracleListProxy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Attribute mit in HTML darzustellenden Daten
  // private communicationService;
  private categorySet:  Array<Category>;
  private category:     Category;         // Aktuelle Kategorie
  private taskSet:      Array<Task>;
  private task:         Task;             // Aktuelle Aufgabe
  // weitere Attribute
  private token:        string;
  private today:        Date = new Date();

  private getUndoneSubTaskSet( t: Task ): Array<SubTask> {
    return t.subTaskSet.filter( x => x.done === false );
  };

  constructor( private miracleListProxy: MiracleListProxy ) {

    // vorübergehende Anmeldelösung nur für Teil 1 und 2
    const li = new LoginInfo();
    li.clientID = 'Ihre erhaltene ClientID';
    li.username = 'Ihre E-Mail-Adresse';
    li.password = 'Beliebiges Kennwort';

    this.miracleListProxy.login( li ).subscribe( x => {
      if ( x === null ) {
        console.log( 'login nicht erfolgreich', x );
        this.communicationService.token = '';
        alert( 'Anmeldefehler!' );
      } else {
        this.token = x.token;
        this.showCategorySet();
      }
    }, err => {
      this.communicationService.token = '';
      console.log( 'Server Fehler!', err );
      alert( 'Server Fehler!' ); } );
  };

  async showCategorySet() {
    console.log( 'CategorySet laden...' );
    const r = await this.miracleListProxy.categorySet( this.communicationService.token ).toPromise();
    this.categorySet = r;
    console.log( 'CategorySet geladen', r );
    this.category = this.categorySet[ 0 ];
    this.showTaskSet( this.category );
  };

  selectCategory( c: Category ) {
    this.task = null;
    this.showTaskSet( c );
  };

  async showTaskSet( c: Category ) {
    console.log( 'TaskSet laden...' );
    this.category = c;
    const x = await this.miracleListProxy.taskSet( this.communicationService.token, c.categoryID ).toPromise();
    this.taskSet = x;
    console.log( 'TaskSet geladen', x );
  }
}

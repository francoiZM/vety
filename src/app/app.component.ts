import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonApp,
  IonMenu,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonRouterOutlet
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonMenu,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonRouterOutlet,
    RouterModule
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor() {}
}

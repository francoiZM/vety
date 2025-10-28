import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCol,
  IonRow,
  IonButton,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonGrid,IonMenu,
  IonMenuButton,IonButtons,
  IonFooter,
  IonText,
  IonMenuToggle,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCol,
    IonRow,
    IonButton,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonInput,
    IonGrid,IonMenu,
  IonMenuButton,IonButtons, IonFooter, IonText, IonMenuToggle,IonList,IonItem,IonIcon,IonLabel
  ],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  success = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  Registro() {
    console.log('navegando al registro...');
    this.router.navigate(['/registro']);
  }

  InventarioM(){
    console.log('navegando al inventario...');
    this.router.navigate(['/inventario-m']);
  }

  login() {
    console.log('Iniciando sesión...');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if(this.email === 'franco' && this.password === '12345') {
      this.router.navigate(['/inventario-m']);
    }
    else {
      console.log('Credenciales incorrectas');
      this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    }
  }
}

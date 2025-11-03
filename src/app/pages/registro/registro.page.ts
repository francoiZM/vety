import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle,
  IonItem, IonLabel, IonInput, IonButton, IonGrid,
  IonRow, IonCol, IonText, IonButtons, IonMenuButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, 
    IonTitle, IonToolbar, IonCard, IonCardHeader, 
    IonCardContent, IonCardTitle, IonItem, IonLabel, 
    IonInput, IonButton, IonGrid, IonRow, IonCol, IonText, IonButtons, IonMenuButton
  ]
})
export class RegistroPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  registro() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    if (!this.validarEmail(this.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    console.log('Registro exitoso');
    this.router.navigate(['/login']);
  }
}

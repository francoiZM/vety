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
import { FirebaseUsuarioService, usuario } from 'src/app/services/firebase-usuario.service';


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
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  success: boolean = false;

  constructor(private router: Router, private firebaseUsuarioService: FirebaseUsuarioService) { }

  ngOnInit() { }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validarRegistro(): boolean {
    let errores = 0;
    this.errorMessage = '';
    if (!this.nombre.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      errores++;
    } else if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      errores++;
    } else if (!this.validarEmail(this.email)) {
      this.errorMessage = 'Por favor, ingresa un email válido';
      errores++;
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      errores++;
    }
    return errores === 0;
  }


  async registrarEnFirebase() {
    // Lógica para registrar el usuario en Firebase
    if (this.validarRegistro()) {
      const nuevoUsuario: usuario = {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        rol: 'usuario' // Asignar un rol por defecto
      };
      try {
        await this.firebaseUsuarioService.agregarUsuario(nuevoUsuario);
        this.success = true;
        this.errorMessage = '';
        // Redirigir al usuario o mostrar mensaje de éxito
        this.router.navigate(['/login']);
      } catch (error) {
        this.errorMessage = 'Error al registrar el usuario. Inténtalo de nuevo.';
        this.success = false;
      }
      
    }
  }

  





}

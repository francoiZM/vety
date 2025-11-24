import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton
  ]
})
export class TareasPage implements OnInit {
  tareaEditando: any = null;
  editIndex: number | null = null;

  tareas: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  iniciarEdicion(index: number) {
    this.editIndex = index;
    this.tareaEditando = { ...this.tareas[index] };
  }

  guardarEdicion() {
    if (this.editIndex !== null && this.tareaEditando) {
      this.tareas[this.editIndex] = { ...this.tareaEditando };
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
      this.editIndex = null;
      this.tareaEditando = null;
    }
  }

  cancelarEdicion() {
    this.editIndex = null;
    this.tareaEditando = null;
  }

  agregarTarea(tarea: any) {
    this.tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

}

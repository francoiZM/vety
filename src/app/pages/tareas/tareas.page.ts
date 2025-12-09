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
import { FirebaseTareaService, tarea as TareaDTO } from 'src/app/services/firebase-tarea.service';

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

  constructor(private firebaseTareaService: FirebaseTareaService) { }

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.firebaseTareaService.obtenerTareas().subscribe((lista) => {
      this.tareas = lista;
    });
  }

  eliminarTarea(index: number) {
    const t = this.tareas[index] as TareaDTO;
    if (t?.id) {
      this.firebaseTareaService.eliminarTarea(t.id).then(() => {
        // la lista se actualizará por la suscripción
      });
    }
  }

  iniciarEdicion(index: number) {
    this.editIndex = index;
    this.tareaEditando = { ...this.tareas[index] };
  }

  guardarEdicion() {
    if (this.editIndex !== null && this.tareaEditando) {
      const original = this.tareas[this.editIndex] as TareaDTO;
      const actualizada: TareaDTO = {
        id: original.id,
        medicamentos: this.tareaEditando.medicamentos || original.medicamentos,
        fecha: this.tareaEditando.fecha || original.fecha,
        pesoMascota: this.tareaEditando.pesoMascota || original.pesoMascota,
      };
      this.firebaseTareaService.actualizarTarea(actualizada).then(() => {
        this.editIndex = null;
        this.tareaEditando = null;
      });
    }
  }

  cancelarEdicion() {
    this.editIndex = null;
    this.tareaEditando = null;
  }

  agregarTarea(tarea: any) {
    const nueva: TareaDTO = {
      medicamentos: tarea.medicamentos || [],
      fecha: tarea.fecha || new Date().toISOString(),
      pesoMascota: tarea.pesoMascota || 0,
    };
    this.firebaseTareaService.agregarTarea(nueva);
  }

}

import { Injectable } from '@angular/core';
import { Database, ref, push, set, onValue, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface tarea {
  id?: string;
  medicamentos: Array<{ medicamento: string; cantidad: number }>;
  fecha: string; // ISO string
  pesoMascota: number | string;
}

@Injectable({ providedIn: 'root' })
export class FirebaseTareaService {
  constructor(private database: Database) {}

  agregarTarea(tarea: tarea): Promise<void> {
    const tareasRef = ref(this.database, 'tareas');
    const newTareaRef = push(tareasRef);
    tarea.id = newTareaRef.key!;
    return set(newTareaRef, tarea);
  }

  obtenerTareas(): Observable<tarea[]> {
    return new Observable<tarea[]>((observer) => {
      const tareasRef = ref(this.database, 'tareas');
      onValue(tareasRef, (snapshot) => {
        const tareas: tarea[] = [];
        snapshot.forEach((child) => {
          const t: tarea = child.val();
          t.id = child.key!;
          tareas.push(t);
        });
        observer.next(tareas);
      });
    });
  }

  eliminarTarea(id: string): Promise<void> {
    const tareaRef = ref(this.database, `tareas/${id}`);
    return remove(tareaRef);
  }

  actualizarTarea(tarea: tarea): Promise<void> {
    if (!tarea.id) {
      return Promise.reject('La tarea debe tener un ID para ser actualizada.');
    }
    const tareaRef = ref(this.database, `tareas/${tarea.id}`);
    return set(tareaRef, tarea);
  }
}

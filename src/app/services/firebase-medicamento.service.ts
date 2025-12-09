import {Injectable} from '@angular/core';
import {Database, ref, push, set, onValue, remove} from '@angular/fire/database';
import {Observable} from 'rxjs';

export interface medicamento {
  id?: string;
  nombre: string;
  principioactivo: string;
  categoria: string;
  concentracion: string;
  dosis: string;
  presentacion: string;
  imagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseMedicamentoService {
  constructor(private database: Database) { }

  agregarMedicamento(medicamento: medicamento): Promise<void> {
    const medicamentosRef = ref(this.database, 'medicamentos');
    const newMedicamentoRef = push(medicamentosRef);
    medicamento.id = newMedicamentoRef.key!;
    return set(newMedicamentoRef, medicamento);
  }

  obtenerMedicamentos(): Observable<medicamento[]> {
    return new Observable<medicamento[]>(observer => {
      const medicamentosRef = ref(this.database, 'medicamentos');
      onValue(medicamentosRef, snapshot => {
        const medicamentos: medicamento[] = [];
        snapshot.forEach(childSnapshot => {
          const medicamento: medicamento = childSnapshot.val();
          medicamento.id = childSnapshot.key!;
          medicamentos.push(medicamento);
        });
        observer.next(medicamentos);
      });
    });

  }
  eliminarMedicamento(id: string): Promise<void> {
    const medicamentoRef = ref(this.database, `medicamentos/${id}`);
    return remove(medicamentoRef);

  }

  actualizarMedicamento(medicamento: medicamento): Promise<void> {
    if (!medicamento.id) {
      return Promise.reject('El medicamento debe tener un ID para ser actualizado.');
    }
    const medicamentoRef = ref(this.database, `medicamentos/${medicamento.id}`);
    return set(medicamentoRef, medicamento);
  }




}

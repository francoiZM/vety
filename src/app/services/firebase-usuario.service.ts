import {Injectable} from '@angular/core';
import {Database, ref, push, set, onValue, remove} from '@angular/fire/database';
import {Observable} from 'rxjs';

export interface usuario {
  id?: string;
    nombre: string;
    email: string;
    password: string;
    rol: string;
    imagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseUsuarioService {
  constructor(private database: Database) { }

  agregarUsuario(usuario: usuario): Promise<void> {
    const usuariosRef = ref(this.database, 'usuarios');
    const newUsuarioRef = push(usuariosRef);
    usuario.id = newUsuarioRef.key!;
    return set(newUsuarioRef, usuario);
  }

  obtenerUsuarios(): Observable<usuario[]> {
    return new Observable<usuario[]>(observer => {
      const usuariosRef = ref(this.database, 'usuarios');
      onValue(usuariosRef, snapshot => {
        const usuarios: usuario[] = [];
        snapshot.forEach(childSnapshot => {
          const usuario: usuario = childSnapshot.val();
          usuario.id = childSnapshot.key!;
          usuarios.push(usuario);
        });
        observer.next(usuarios);
      });
    });

  }
  eliminarUsuario(id: string): Promise<void> {
    const usuarioRef = ref(this.database, `usuarios/${id}`);
    return remove(usuarioRef);

  }

  actualizarUsuario(usuario: usuario): Promise<void> {
    if (!usuario.id) {
      return Promise.reject('El usuario debe tener un ID para ser actualizado.');
    }
    const usuarioRef = ref(this.database, `usuarios/${usuario.id}`);
    return set(usuarioRef, usuario);
  }
    //login por mail y password
    obtenerUsuarioPorMailyPassword (email: string, password: string): Observable<usuario | null> {
    return new Observable<usuario | null>((observer) => {
      const usuariosRef = ref(this.database, 'usuarios');
      onValue(usuariosRef, (snapshot) => {
        let usuarioEncontrado: usuario | null = null;
        snapshot.forEach((childSnapshot) => {
          const usuario: usuario = childSnapshot.val();
          if (usuario.email === email && usuario.password === password) {
            usuarioEncontrado = usuario;
            return true; // Salir del bucle forEach
          }
          return false; // Continuar el bucle forEach
        });
        observer.next(usuarioEncontrado);
      });
    });
  }



}

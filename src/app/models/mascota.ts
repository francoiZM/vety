


export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  peso: number;
  usuario?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'; 
import {calculatorOutline, addCircleOutline} from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Router} from '@angular/router';
import { FirebaseMedicamentoService, medicamento as MedicamentoDTO } from 'src/app/services/firebase-medicamento.service';
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
    IonGrid,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonSearchbar,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonLabel,
    IonChip,
    IonFab,
    IonFabButton,
    IonIcon, IonFooter,
    IonMenuToggle, IonNote, AlertController
} from '@ionic/angular/standalone';
  import { ToastController } from '@ionic/angular';

// Usamos la interfaz del servicio y añadimos la propiedad local 'selected'
type Medicamento = MedicamentoDTO & { selected: boolean };

@Component({
  selector: 'app-inventario-m',
  templateUrl: './inventario-m.page.html',
  styleUrls: ['./inventario-m.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonCard,
    IonCol,
    IonIcon,
    IonRow,
    IonButton,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonInput,
    IonGrid,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonSearchbar,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonLabel,
    IonChip,
    IonFab,
    IonFabButton,
    IonIcon,IonFooter,IonMenuToggle, IonNote
  ]
})


export class InventarioMPage implements OnInit {

  imagenCapturada: string | undefined;
  medicamentoEnEdicionId: number | null = null;

  medicamentos: Medicamento[] = [
    {
      id: '1',
      nombre: 'Meloxivet perros',
      principioactivo: 'Meloxicam',
      categoria: 'Antibiótico',
      concentracion: '1 mg/ml',
      dosis: '0.1 ml/ kg',
      presentacion: 'suspension',
      selected: false
    },
    {
      id: '2',
      nombre: 'Meloxivet gatos',
      principioactivo: 'Meloxicam',
      categoria: 'Analgésico',
      concentracion: '0,5 mg/ml',
      presentacion: 'suspension',
      dosis: '0.1 ml/ kg',
      selected: false
    },
    {
      id: '3',
      nombre: 'Rimadyl',
      principioactivo: 'Carprofeno',
      categoria: 'Antiinflamatorio',
      concentracion: '25mg',
      dosis: '2 mg/kg',
      presentacion: 'pastilla',
      selected: false
    }
  ];
  //barra busqueda
  searchTerm = '';
  //formulario
  formularioMedicamento!: FormGroup; 
  medicamentoSeleccionado: Medicamento | null = null; 
  mostrandoFormulario: boolean = false; 
  medicamentosFiltrados: Medicamento[] = [];

  constructor(private router: Router, private fb: FormBuilder, private alertController: AlertController, private firebaseMedicamentoService: FirebaseMedicamentoService, private toastController: ToastController) {
    addIcons({
      'calculator-outline': calculatorOutline,
      'add-circle-outline': addCircleOutline,
    });
    this.crearFormulario();
  }
 //crear formulario
  crearFormulario(medicamento?: Medicamento) {
    this.formularioMedicamento = this.fb.group({
      id: [medicamento ? medicamento.id : null],
      nombre: [medicamento ? medicamento.nombre : '', [Validators.required, Validators.maxLength(100)]],
      principioactivo: [medicamento ? medicamento.principioactivo : '', Validators.required],
      categoria: [medicamento ? medicamento.categoria : '', Validators.required],
      concentracion: [medicamento ? medicamento.concentracion : '', Validators.required],
      dosis: [medicamento ? medicamento.dosis : '', Validators.required],
      presentacion: [medicamento ? medicamento.presentacion : '', Validators.required],
    });
    // Si el medicamento tiene imagen, la mostramos en el formulario
    this.imagenCapturada = medicamento?.imagen;
  }

  ngOnInit() {
    // Cargar medicamentos desde Firebase y preparar lista filtrada
    this.firebaseMedicamentoService.obtenerMedicamentos().subscribe((lista) => {
      this.medicamentos = lista.map(m => ({ ...m, selected: false }));
      this.FiltrarMedicamento();
    });
  }


  //abrir formulario crear
  abrirFormularioCrear() {
    this.medicamentoSeleccionado = null;
    this.medicamentoEnEdicionId = null;
    this.crearFormulario();
    this.mostrandoFormulario = true;
  }
  //abrir formulario actualizar
  abrirFormularioActualizar(medicamento: Medicamento) {
    this.medicamentoSeleccionado = medicamento;
    this.medicamentoEnEdicionId = medicamento.id ? Number(medicamento.id) : null;
    this.crearFormulario(medicamento);
    this.mostrandoFormulario = true;
  }
 //guardar medicamento
  guardarMedicamento() {
    if (this.formularioMedicamento.invalid) {
      this.formularioMedicamento.markAllAsTouched(); 
      return; 
    }

    const datosGuardar: Medicamento = this.formularioMedicamento.value;
    // Asignar imagen capturada si existe
    if (this.imagenCapturada) {
      datosGuardar.imagen = this.imagenCapturada;
    }

    // Construir payload compatible con Firebase
    const payload: MedicamentoDTO = {
      id: (datosGuardar as any).id, // puede ser string en Firebase
      nombre: datosGuardar.nombre,
      principioactivo: datosGuardar.principioactivo,
      categoria: datosGuardar.categoria,
      concentracion: datosGuardar.concentracion,
      dosis: datosGuardar.dosis,
      presentacion: datosGuardar.presentacion,
      imagen: datosGuardar.imagen,
    };

    const accion = payload.id
      ? this.firebaseMedicamentoService.actualizarMedicamento(payload)
      : this.firebaseMedicamentoService.agregarMedicamento(payload);

    accion
      .then(async () => {
        const toast = await this.toastController.create({
          message: payload.id ? 'Medicamento actualizado' : 'Medicamento creado',
          duration: 1500,
          color: 'success',
          position: 'bottom'
        });
        await toast.present();
      })
      .catch(async (err) => {
        console.error('Error guardando medicamento:', err);
        const toast = await this.toastController.create({
          message: 'Error al guardar el medicamento',
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        });
        await toast.present();
      })
      .finally(() => {
        this.mostrandoFormulario = false;
        if (this.formularioMedicamento) {
          this.formularioMedicamento.reset();
        }
        this.medicamentoSeleccionado = null;
        this.imagenCapturada = undefined;
        this.FiltrarMedicamento();
      });
  }
  //eliminar con confirmacion
  async confirmarYEliminar(id: string | undefined) {
    if (!id) {
      return;
    }
    const alert = await this.alertController.create({ 
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar este medicamento del inventario? Esta acción es irreversible.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.eliminarMedicamento(id);
            if (this.medicamentoSeleccionado && this.medicamentoSeleccionado.id === String(id)) {
                this.mostrandoFormulario = false; 
            }
          }
        }
      ]
    });
    await alert.present();
  }



  //crear medicamento
  async crearMedicamento() {
    // Opcional: capturar foto con la cámara al crear
    let imagenDataUrl: string | undefined;
    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      imagenDataUrl = foto.dataUrl;
    } catch (e) {
      // Si el usuario cancela o hay error, continuamos sin imagen
      imagenDataUrl = undefined;
    }

    const nuevoMedicamento: MedicamentoDTO = {
      nombre: 'Nuevo Medicamento',
      principioactivo: 'principio activo',
      categoria: 'Categoría',
      concentracion: 'Concentración',
      dosis: 'Dosis',
      presentacion: 'Presentación',
      imagen: imagenDataUrl,
    };
    await this.firebaseMedicamentoService.agregarMedicamento(nuevoMedicamento);
    this.FiltrarMedicamento();
  }

  //eliminar medicamento
eliminarMedicamento(id: string) {
  this.firebaseMedicamentoService.eliminarMedicamento(id).then(() => {
       this.FiltrarMedicamento(); 
     });
  }

  //acualizar medicamento con textos nombre, categoria, presentacion

  actualizarMedicamento(id: number, campo: 'nombre' | 'categoria' | 'presentacion' | 'principioactivo' | 'concentracion', valor: string) {
    const medicamento = this.medicamentos.find(med => med.id === String(id));
    if (medicamento) {
      medicamento[campo] = valor;
      // Persistimos el cambio en Firebase
      const payload: MedicamentoDTO = { ...medicamento };
      this.firebaseMedicamentoService.actualizarMedicamento(payload);
      this.FiltrarMedicamento();
    }
  }

  FiltrarMedicamento() {
    if (this.searchTerm) {
      this.medicamentosFiltrados = this.medicamentos.filter(med => 
        med.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        med.categoria.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        med.principioactivo.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.medicamentosFiltrados = [...this.medicamentos]; 
    }
  }

  seleccionarMedicamento(medicamento: Medicamento) {
    if (!this.mostrandoFormulario) { 
      medicamento.selected = !medicamento.selected;
    }
  }

  haySeleccionados(): boolean {
    return this.medicamentos.some(med => med.selected);
  }

  CalcularDosis() {
  const medicamentosSeleccionados = this.medicamentos.filter(med => med.selected);
  
  this.router.navigate(['/calculo-dosis'], {
    queryParams: { 
      medicamentos: JSON.stringify(medicamentosSeleccionados)
    }
  });
}

  async tomarFoto() {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,

       
      });
      this.imagenCapturada = foto.dataUrl;
      // La imagen se mostrará en el formulario y se guardará al guardarMedicamento
      // Si estamos editando, actualizamos la imagen en el objeto seleccionado
      if (this.medicamentoEnEdicionId) {
        const med = this.medicamentos.find(m => Number(m.id) === this.medicamentoEnEdicionId);
        if (med) {
          med.imagen = this.imagenCapturada;
          const payload: MedicamentoDTO = { ...med };
          this.firebaseMedicamentoService.actualizarMedicamento(payload);
        }
      }
    } catch (e) {
      console.error('Error al tomar la foto:', e);
    }
  }

}


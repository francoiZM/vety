import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'; 
import {calculatorOutline, addCircleOutline} from 'ionicons/icons';
import {Router} from '@angular/router';
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

interface Medicamento {
  id: number;
  nombre: string;
  principioactivo: string;
  categoria: string;
  concentracion: string;
  dosis: string;
  presentacion: string;
  selected: boolean;
}

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
  medicamentos: Medicamento[] = [
    {
      id: 1,
      nombre: 'Meloxivet perros',
      principioactivo: 'Meloxicam',
      categoria: 'Antibiótico',
      concentracion: '1 mg/ml',
      dosis: '0.1 ml/ kg',
      presentacion: 'suspension',
      selected: false
    },
    {
      id: 2,
      nombre: 'Meloxivet gatos',
      principioactivo: 'Meloxicam',
      categoria: 'Analgésico',
      concentracion: '0,5 mg/ml',
      presentacion: 'suspension',
      dosis: '0.1 ml/ kg',
      selected: false
    },
    {
      id: 3,
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

  constructor(private router: Router, private fb: FormBuilder, private alertController: AlertController) {
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
  }

  ngOnInit() {
    this.FiltrarMedicamento();
  }
  //abrir formulario crear
  abrirFormularioCrear() {
    this.medicamentoSeleccionado = null;
    this.crearFormulario();
    this.mostrandoFormulario = true;
  }
  //abrir formulario actualizar
  abrirFormularioActualizar(medicamento: Medicamento) {
    this.medicamentoSeleccionado = medicamento;
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

    if (datosGuardar.id) {

      const index = this.medicamentos.findIndex(med => med.id === datosGuardar.id);
      if (index !== -1) {

        this.medicamentos[index] = { ...datosGuardar, selected: this.medicamentos[index].selected };
      }
    } else {

      const nuevoId = this.medicamentos.length > 0 ? Math.max(...this.medicamentos.map(m => m.id)) + 1 : 1;
      const nuevoMedicamento: Medicamento = { 
        ...datosGuardar, 
        id: nuevoId, 
        selected: false 
      };
      this.medicamentos.push(nuevoMedicamento);
    }
    
    this.mostrandoFormulario = false; 
    this.FiltrarMedicamento(); 
  }
  //eliminar con confirmacion
  async confirmarYEliminar(id: number) {
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
            if (this.medicamentoSeleccionado && this.medicamentoSeleccionado.id === id) {
                this.mostrandoFormulario = false; 
            }
          }
        }
      ]
    });
    await alert.present();
  }



  //crear medicamento
  crearMedicamento() {
    const nuevoMedicamento = {
      id: this.medicamentos.length + 1,
      nombre: 'Nuevo Medicamento',
      principioactivo: 'principio activo',
      categoria: 'Categoría',
      concentracion: 'Concentración',
      dosis: 'Dosis',
      presentacion: 'Presentación',
      selected: false
    };
    this.medicamentos.push(nuevoMedicamento);
    this.FiltrarMedicamento();
  }

  //eliminar medicamento
eliminarMedicamento(id: number) {
     this.medicamentos = this.medicamentos.filter(med => med.id !== id);
     this.FiltrarMedicamento(); 
  }

  //acualizar medicamento con textos nombre, categoria, presentacion

  actualizarMedicamento(id: number, campo: 'nombre' | 'categoria' | 'presentacion' | 'principioactivo' | 'concentracion', valor: string) {
    const medicamento = this.medicamentos.find(med => med.id === id);
    if (medicamento) {
      medicamento[campo] = valor;
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
  }


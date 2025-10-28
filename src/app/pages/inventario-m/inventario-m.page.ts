import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'; 
import {calculatorOutline} from 'ionicons/icons';
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
    IonMenuToggle
} from '@ionic/angular/standalone';

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
    IonIcon,IonFooter,IonMenuToggle
  ]
})
export class InventarioMPage implements OnInit {



  medicamentos = [
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

  medicamentosFiltrados = [...this.medicamentos];
  searchTerm = '';

  constructor(private router: Router) {
      addIcons({
      'calculator-outline': calculatorOutline,
    });
   }

  ngOnInit() {
    this.FiltrarMedicamento();
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

  ActualizarMedicamento(id: number, campo: 'nombre' | 'categoria' | 'presentacion' | 'principioactivo' | 'concentracion', valor: string) {
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
        med.categoria.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.medicamentosFiltrados = [...this.medicamentos];
    }
  }

  seleccionarMedicamento(medicamento: any) {
    medicamento.selected = !medicamento.selected;
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


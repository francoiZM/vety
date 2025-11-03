import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'; 
import {calculatorOutline} from 'ionicons/icons';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
    IonIcon, IonFooter, IonListHeader, IonMenuToggle
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-calculo-dosis',
  templateUrl: './calculo-dosis.page.html',
  styleUrls: ['./calculo-dosis.page.scss'],
  standalone: true,
  imports: [ IonContent,
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
    IonIcon,IonFooter,IonListHeader,IonMenuToggle]
})
export class CalculoDosisPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
      if (params['medicamentos']) {
 
        this.medicamentoSeleccionado = JSON.parse(params['medicamentos']);
      }
    });
  }
  pesoMascota: number | null = null;
  medicamentoSeleccionado: any = null
  dosisCalculadas: Array<{medicamento: string, cantidad: number}> = [];

  calcularDosis() {
    if (this.pesoMascota) {
      this.dosisCalculadas = this.medicamentoSeleccionado.map((med: { nombre: any; dosis: string; concentracion: string; }) => ({
        medicamento: med.nombre,
        //peso de mascota x dosis por kg / en concentracion del medicamento
        cantidad: this.pesoMascota! * parseFloat(med.dosis.split(' ')[0]) / parseFloat(med.concentracion.split(' ')[0])
      }));
    }
  }
 

}

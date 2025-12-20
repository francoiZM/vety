import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { CommonModule } from '@angular/common';
import { Mascota } from '../../models/mascota';
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
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonBadge
  ]

})
export class MascotasPage implements OnInit {

  mascotas: Mascota[] = [];

  constructor(private mascotaService: MascotaService) {}

  ngOnInit() {
    this.mascotaService.getMascotas().subscribe(data => {
      this.mascotas = data;
    });
  }
}

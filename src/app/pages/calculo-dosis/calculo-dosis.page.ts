import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons'; 
import {calculatorOutline} from 'ionicons/icons';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FirebaseTareaService, tarea as TareaDTO } from 'src/app/services/firebase-tarea.service';
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
  horaNotificacion: string = '';
  diasNotificacion: number = 1;

  // Tareas guardadas
  tareas: Array<any> = [];
  tareaProgramada: any = null;

  constructor(private router: Router, private route: ActivatedRoute, private firebaseTareaService: FirebaseTareaService) {

   }

  async ngOnInit() {
     this.route.queryParams.subscribe(params => {
      if (params['medicamentos']) {
 
        this.medicamentoSeleccionado = JSON.parse(params['medicamentos']);
      }
    });
    // Solicitar permisos y crear canal de notificaciones para Android
    try {
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display !== 'granted') {
        console.warn('Permisos de notificación no concedidos');
      }
      await LocalNotifications.createChannel({
        id: 'recordatorios-dosis',
        name: 'Recordatorios de Dosis',
        description: 'Notificaciones para recordar medicación',
        importance: 5,
        visibility: 1,
        sound: 'default',
        lights: true,
        vibration: true
      });
    } catch (e) {
      console.error('Error inicializando notificaciones:', e);
    }
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

  crearTareaRecordatorio() {
    if (!this.dosisCalculadas.length || !this.horaNotificacion || !this.diasNotificacion) return;
    const hoy = new Date();
    for (let i = 0; i < this.diasNotificacion; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      const [hora, minutos] = this.horaNotificacion.split(':').map(Number);
      fecha.setHours(hora, minutos, 0, 0);
      const tarea: TareaDTO = {
        medicamentos: this.dosisCalculadas,
        fecha: fecha.toISOString(),
        pesoMascota: this.pesoMascota ?? 0
      };
      this.firebaseTareaService.agregarTarea(tarea);
      const notifId = Math.floor((Date.now() % 2147483647) + i);
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Recordatorio de Medicación',
            body: `Debes dar la dosis a tu mascota.`,
            id: notifId,
            schedule: { at: fecha },
            channelId: 'recordatorios-dosis',
            actionTypeId: '',
            extra: {
              medicamentos: this.dosisCalculadas,
              pesoMascota: this.pesoMascota
            }
          }
        ]
      });
    }
  }

  async probarNotificacion() {
    try {
      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== 'granted') {
        await LocalNotifications.requestPermissions();
      }
      const testId = Math.floor(Date.now() % 2147483647);
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Prueba de Notificación',
            body: 'Este es un mensaje de prueba.',
            id: testId,
            schedule: { at: new Date(Date.now() + 2000) },
            channelId: 'recordatorios-dosis'
          }
        ]
      });
    } catch (e) {
      console.error('Error al probar notificación:', e);
    }
  }


}


import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {provideDatabase, getDatabase} from "@angular/fire/database";
import {provideFirebaseApp} from "@angular/fire/app";


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({}),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
});


import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then( m => m.MainPage)
  },
  {
    path: 'calculo-dosis',
    loadComponent: () => import('./pages/calculo-dosis/calculo-dosis.page').then( m => m.CalculoDosisPage)
  },
  {
    path: 'inventario-m',
    loadComponent: () => import('./pages/inventario-m/inventario-m.page').then( m => m.InventarioMPage)
  },
];

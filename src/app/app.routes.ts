import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./articles/inicio/inicio.routes').then(m => m.INICIO_ROUTES)
    },
    {
        path: 'telos',
        loadChildren: () => import('./articles/telos/telos.routes').then(m => m.TELOS_ROUTES)
    },
    {
        path: 'telos/:ciudad/:categoria', // Ruta ajustada para recibir parámetro 'ciudad' 
        loadChildren: () => import('./articles/telos/telos.routes').then(m => m.TELOS_ROUTES)
    },
    {
        path: 'funciona',
        loadChildren: () => import('./articles/funciona/funciona.routes').then(m => m.FUNCIONA_ROUTES)
    },
    {
        path: 'buscar',
        loadChildren: () => import('./articles/buscar/buscar.routes').then(m => m.BUSCAR_ROUTES)
    },
    {
        path: 'telos-cercanos',
        loadChildren: () => import('./articles/telos-cercanos/telos-cercanos.routes').then(m => m.TELOS_CERCANOS_ROUTES)
    },
    {
        path: 'centro-de-ayuda',
        loadChildren: () => import('./articles/ayuda/ayuda.routes').then(m => m.AYUDA_ROUTES)
    },
    {
        path: 'eres-hotelero',
        loadChildren: () => import('./articles/funciona/nav-funciona/hotelero/hotelero.routes').then(m => m.HOTELERO_ROUTES)
    },
    {
        path: 'conocenos',
        loadChildren: () => import('./articles/funciona/nav-funciona/conocenos/conocenos.routes').then(m => m.CONOCENOS_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    }
];
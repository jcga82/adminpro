import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { AuthGuard } from '../guards/auth.guard';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';



const pagesRoutes: Routes = [
    {
            path: '',
            component: PagesComponent,
            canActivate: [AuthGuard],
            children: [
                //Rutas del router-outler secundario
                { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
                { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
                { path: 'dashboard/perfil/:id', component: PerfilComponent, data: {titulo: 'Perfil'} },
                { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Calidad del dato'} },
                { path: 'notificaciones', component: NotificacionComponent, data: {titulo: 'Notificaciones'} },
                { path: 'solicitudes', component: SolicitudComponent, data: {titulo: 'Solicitudes'} },
                { path: 'seguimientos', component: SeguimientoComponent, data: {titulo: 'Seguimientos'} },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full', data: {titulo: 'Dashboard'} },
            ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
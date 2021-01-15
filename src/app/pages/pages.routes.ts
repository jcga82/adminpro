import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';



const pagesRoutes: Routes = [
    {
            path: '',
            component: PagesComponent,
            children: [
                //Rutas del router-outler secundario
                { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
                { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
                { path: 'dashboard/perfil/:id', component: PerfilComponent, data: {titulo: 'Perfil'} },
                { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Calidad del dato'} },
                { path: '', redirectTo: '/dashboard', pathMatch: 'full', data: {titulo: 'Dashboard'} },
            ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
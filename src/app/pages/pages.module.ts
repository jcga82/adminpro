import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { ComponentsModule } from '../components/components.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NotificacionComponent } from './notificacion/notificacion.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        PerfilComponent,
        LoginComponent,
        NotificacionComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PAGES_ROUTES,
        ComponentsModule,
        NgxGaugeModule,
        PipesModule,
        NgbModule
    ],
    providers: [DatePipe, DecimalPipe],
})

export class PagesModule {  }
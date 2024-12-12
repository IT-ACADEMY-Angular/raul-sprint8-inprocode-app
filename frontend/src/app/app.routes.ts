import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChartComponent } from './components/chart/chart.component';
import { AddEditProductComponent } from './components/crud/add-edit-product/add-edit-product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: AddEditProductComponent },
    { path: 'mapa', component: MapComponent },
    { path: 'full-calendar', component: CalendarComponent },
    { path: 'graficos', component: ChartComponent },
    { path: '**', redirectTo: '/home' }
];

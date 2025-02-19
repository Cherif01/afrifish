import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EntiteComponent } from './components/entite/entite.component';

export const homeRouting: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'entite',
    component: EntiteComponent,
  },
];

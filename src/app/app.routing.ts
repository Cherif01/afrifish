import { Routes } from '@angular/router';
import { NotfoundComponent } from './public/notfound/notfound.component';

export const AppRouting: Routes = [
  // Redirection initiale vers /home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // Route principale pour /home avec protection par AuthGuard
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/modules/authentification/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/modules/accueil/home.module').then((m) => m.HomeModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('../app/modules/stock/stock.module').then((m) => m.StockModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../app/modules/contact/contact.module').then((m) => m.ContactModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'operation',
    loadChildren: () =>
      import('../app/modules/operations/operations.module').then((m) => m.OperationsModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'comptabilite',
    loadChildren: () =>
      import('../app/modules/comptabilite/comptabilite.module').then((m) => m.ComptabiliteModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'parametre',
    loadChildren: () =>
      import('../app/modules/parametre/parametre.module').then((m) => m.ParametreModule),
    // canActivate: [AuthGuard],
  },
  // Gestion des routes non trouvées
  {
    path: '**',
    redirectTo: '/home/home',
  },
];

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
  // Gestion des routes non trouvées
  {
    path: '**',
    redirectTo: '/home/home',
  },
];

import { Routes } from "@angular/router";
import { ListAccesComponent } from "./_component/acces/list-acces/list-acces.component";
import { ListUtilisateurComponent } from "./_component/utilisateurs/list-utilisateur/list-utilisateur.component";
import { AffectationComponent } from "./_component/affectation/affectation.component";
import { ProfileComponent } from "./_component/utilisateurs/profile/profile.component";

export const parametreRouting: Routes = [

  {
    path: 'list-user',
    component: ListUtilisateurComponent
  },
  {
    path: 'list-acces',
    component: ListAccesComponent,
  },
  {
    path: 'list-affectation',
    component: AffectationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

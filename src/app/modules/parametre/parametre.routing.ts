import { Routes } from "@angular/router";
import { ListAccesComponent } from "./_component/acces/list-acces/list-acces.component";
import { ListUtilisateurComponent } from "./_component/utilisateurs/list-utilisateur/list-utilisateur.component";

export const parametreRouting: Routes = [

  {
    path: 'list-user',
    component: ListUtilisateurComponent
  },
  {
    path: 'list-acces',
    component: ListAccesComponent,
  },
];

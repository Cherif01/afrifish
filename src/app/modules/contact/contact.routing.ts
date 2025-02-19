import { Routes } from "@angular/router";
import { ListClientComponent } from "./_component/client/list-client/list-client.component";
import { ListFournisseurComponent } from "./_component/fournisseur/list-fournisseur/list-fournisseur.component";

export const contactRouting: Routes = [

  {
    path: 'list-client',
    component: ListClientComponent
  },
  {
    path: 'list-fournisseur',
    component: ListFournisseurComponent,
  },
];

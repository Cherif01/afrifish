import { Routes } from "@angular/router";
import { BonDeCommandeComponent } from "./_component/bon-de-commande/bon-de-commande.component";
import { FactureProformatComponent } from "./_component/facture-proformat/facture-proformat.component";
import { ListVentesComponent } from "./_component/ventes/list-ventes/list-ventes.component";
import { AddVentesComponent } from "./_component/ventes/add-ventes/add-ventes.component";
import { ClientVenteComponent } from "./_component/ventes/client-vente/client-vente.component";
import { InitVenteComponent } from "./_component/ventes/init-vente/init-vente.component";

export const operationRouting: Routes = [

  {
    path: 'bon-commande',
    component: BonDeCommandeComponent
  },
  {
    path: 'pro-format',
    component: FactureProformatComponent,
  },
  {
    path: 'list-vente',
    component: ListVentesComponent,
  },
  {
    path: 'add-vente',
    component: AddVentesComponent,
  },
  {
    path: 'init-vente',
    component: InitVenteComponent,
  },
  {
    path: 'client-vente',
    component: ClientVenteComponent,
  },
  {
    path: 'client-vente',
    component: ClientVenteComponent,
  },
];

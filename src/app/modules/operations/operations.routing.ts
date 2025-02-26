import { Routes } from "@angular/router";
import { BonDeCommandeComponent } from "./_component/bonCommande/bon-de-commande/bon-de-commande.component";
import { FactureProformatComponent } from "./_component/pro-format/facture-proformat/facture-proformat.component";
import { ListVentesComponent } from "./_component/ventes/list-ventes/list-ventes.component";
import { AddVentesComponent } from "./_component/ventes/add-ventes/add-ventes.component";
import { ClientVenteComponent } from "./_component/ventes/client-vente/client-vente.component";
import { InitVenteComponent } from "./_component/ventes/init-vente/init-vente.component";
import { DetailsBonCommandeComponent } from "./_component/bonCommande/details-bon-commande/details-bon-commande.component";
import { FactureVenteComponent } from "./_component/ventes/facture-vente/facture-vente.component";
import { DetailsProformatComponent } from "./_component/pro-format/details-proformat/details-proformat.component";

export const operationRouting: Routes = [

  {
    path: 'bon-commande',
    component: BonDeCommandeComponent
  },
  {
    path: 'details-bon/:id',
    component: DetailsBonCommandeComponent,
  },
  {
    path: 'details-facture/:id',
    component: DetailsProformatComponent,
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
    path: 'panier-vente/:id',
    component: AddVentesComponent,
  },
  {
    path: 'init-vente/:id',
    component: InitVenteComponent,
  },
  {
    path: 'facture-vente/:id',
    component: FactureVenteComponent,
  },
  {
    path: 'client-vente',
    component: ClientVenteComponent,
  },

];

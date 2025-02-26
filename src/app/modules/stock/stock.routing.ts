import { Routes } from "@angular/router";
import { ListApprovisionnementComponent } from "./_component/approvisionner/list-approvisionnement/list-approvisionnement.component";
import { ListCategoriesComponent } from "./_component/categories/list-categories/list-categories.component";
import { ListArticleComponent } from "./_component/inventaire/list-article/list-article.component";
import { FournisseurApprovisionnerComponent } from "./_component/approvisionner/fournisseur-approvisionner/fournisseur-approvisionner.component";
import { InitCommandeComponent } from "./_component/approvisionner/init-commande/init-commande.component";
import { PanierCommandeComponent } from "./_component/approvisionner/panier-commande/panier-commande.component";
import { DetailsApprovisionnementComponent } from "./_component/approvisionner/details-approvisionnement/details-approvisionnement.component";

export const stockRouting: Routes = [

  {
    path: 'list-aprovisionnement',
    component: ListApprovisionnementComponent
  },
  {
    path: 'details-approvisionnement/:id',
    component: DetailsApprovisionnementComponent
  },
  {
    path: 'list-category',
    component: ListCategoriesComponent,
  },
  {
    path: 'list-article',
    component: ListArticleComponent,
  },
  {
    path: 'list-fournisseur',
    component: FournisseurApprovisionnerComponent,
  },
  {
    path: 'init-commande/:id',
    component: InitCommandeComponent,
  },
  {
    path: 'panier-commande/:id',
    component: PanierCommandeComponent,
  },


];

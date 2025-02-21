import { Routes } from "@angular/router";
import { ListApprovisionnementComponent } from "./_component/approvisionner/list-approvisionnement/list-approvisionnement.component";
import { ListCategoriesComponent } from "./_component/categories/list-categories/list-categories.component";
import { ListArticleComponent } from "./_component/inventaire/list-article/list-article.component";
import { FournisseurApprovisionnerComponent } from "./_component/approvisionner/fournisseur-approvisionner/fournisseur-approvisionner.component";

export const stockRouting: Routes = [

  {
    path: 'list-aprovisionnement',
    component: ListApprovisionnementComponent
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
    component: FournisseurApprovisionnerComponent,
  },
 

];

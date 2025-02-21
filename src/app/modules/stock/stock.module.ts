import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListApprovisionnementComponent } from './_component/approvisionner/list-approvisionnement/list-approvisionnement.component';
import { DetailsApprovisionnementComponent } from './_component/approvisionner/details-approvisionnement/details-approvisionnement.component';
import { ListCategoriesComponent } from './_component/categories/list-categories/list-categories.component';
import { DetailsCategoriesComponent } from './_component/categories/details-categories/details-categories.component';
import { ListArticleComponent } from './_component/inventaire/list-article/list-article.component';
import { DetailsInventaireComponent } from './_component/inventaire/details-inventaire/details-inventaire.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { stockRouting } from './stock.routing';
import { AddArticleComponent } from './_dialogs/add-article/add-article.component';
import { FournisseurApprovisionnerComponent } from './_component/approvisionner/fournisseur-approvisionner/fournisseur-approvisionner.component';
import { InitCommandeComponent } from './_component/approvisionner/init-commande/init-commande.component';
import { PanierCommandeComponent } from './_component/approvisionner/panier-commande/panier-commande.component';



@NgModule({
  declarations: [
    ListApprovisionnementComponent,
    DetailsApprovisionnementComponent,
    ListCategoriesComponent,
    DetailsCategoriesComponent,
    ListArticleComponent,
    DetailsInventaireComponent,
    AddArticleComponent,
    FournisseurApprovisionnerComponent,
    InitCommandeComponent,
    PanierCommandeComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(stockRouting)
  ]
})
export class StockModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureProformatComponent } from './_component/pro-format/facture-proformat/facture-proformat.component';
import { ListVentesComponent } from './_component/ventes/list-ventes/list-ventes.component';
import { BonDeCommandeComponent } from './_component/bonCommande/bon-de-commande/bon-de-commande.component';
import { AddVentesComponent } from './_component/ventes/add-ventes/add-ventes.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { operationRouting } from './operations.routing';
import { ClientVenteComponent } from './_component/ventes/client-vente/client-vente.component';
import { InitVenteComponent } from './_component/ventes/init-vente/init-vente.component';
import { DetailsBonCommandeComponent } from './_component/bonCommande/details-bon-commande/details-bon-commande.component';
import { FactureVenteComponent } from './_component/ventes/facture-vente/facture-vente.component';
import { DetailsProformatComponent } from './_component/pro-format/details-proformat/details-proformat.component';



@NgModule({
  declarations: [
    FactureProformatComponent,
    ListVentesComponent,
    BonDeCommandeComponent,
    AddVentesComponent,
    ClientVenteComponent,
    InitVenteComponent,
    DetailsBonCommandeComponent,
    FactureVenteComponent,
    DetailsProformatComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(operationRouting)
  ]
})
export class OperationsModule { }

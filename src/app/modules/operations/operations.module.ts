import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureProformatComponent } from './_component/facture-proformat/facture-proformat.component';
import { ListVentesComponent } from './_component/ventes/list-ventes/list-ventes.component';
import { BonDeCommandeComponent } from './_component/bon-de-commande/bon-de-commande.component';
import { AddVentesComponent } from './_component/ventes/add-ventes/add-ventes.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { operationRouting } from './operations.routing';
import { ClientVenteComponent } from './_component/ventes/client-vente/client-vente.component';
import { InitVenteComponent } from './_component/ventes/init-vente/init-vente.component';



@NgModule({
  declarations: [
    FactureProformatComponent,
    ListVentesComponent,
    BonDeCommandeComponent,
    AddVentesComponent,
    ClientVenteComponent,
    InitVenteComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(operationRouting)
  ]
})
export class OperationsModule { }

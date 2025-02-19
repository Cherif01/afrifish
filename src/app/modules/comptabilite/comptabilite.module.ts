import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseComponent } from './_component/caisse/caisse.component';
import { HistoriqueComponent } from './_component/historique/historique.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { comptabiliteRouting } from './comptabilite.routing';



@NgModule({
  declarations: [
    CaisseComponent,
    HistoriqueComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(comptabiliteRouting)
  ]
})
export class ComptabiliteModule { }

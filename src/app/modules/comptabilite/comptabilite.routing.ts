import { Routes } from "@angular/router";
import { CaisseComponent } from "./_component/caisse/caisse.component";
import { HistoriqueComponent } from "./_component/historique/historique.component";

export const comptabiliteRouting: Routes = [

  {
    path: 'caisse',
    component: CaisseComponent
  },
  {
    path: 'historique',
    component: HistoriqueComponent,
  },
];

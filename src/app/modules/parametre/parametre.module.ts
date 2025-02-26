import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUtilisateurComponent } from './_component/utilisateurs/list-utilisateur/list-utilisateur.component';
import { ListAccesComponent } from './_component/acces/list-acces/list-acces.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { parametreRouting } from './parametre.routing';
import { AffectationComponent } from './_component/affectation/affectation.component';



@NgModule({
  declarations: [
    ListUtilisateurComponent,
    ListAccesComponent,
    AffectationComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(parametreRouting)
  ]
})
export class ParametreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFournisseurComponent } from './_component/fournisseur/list-fournisseur/list-fournisseur.component';
import { DetailsFournisseurComponent } from './_component/fournisseur/details-fournisseur/details-fournisseur.component';
import { ListClientComponent } from './_component/client/list-client/list-client.component';
import { DetailsClientComponent } from './_component/client/details-client/details-client.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { contactRouting } from './contact.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListFournisseurComponent,
    DetailsFournisseurComponent,
    ListClientComponent,
    DetailsClientComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(contactRouting)
  ]
})
export class ContactModule { }

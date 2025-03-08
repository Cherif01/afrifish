import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Component({
  selector: 'app-details-approvisionnement',
  templateUrl: './details-approvisionnement.component.html',
  styleUrls: ['./details-approvisionnement.component.scss']
})
export class DetailsApprovisionnementComponent {
  title: string = 'Bon de Commande';
  constructor(private router: Router,
    private service :HomeService,
    private activeRoute:ActivatedRoute,
    private snackBar :MatSnackBar,
    private dialog: MatDialog,
  ){

  }
  id_initCommande: any
  ngOnInit(): void {
    (this.id_initCommande = this.activeRoute.snapshot.params['id'])
    console.log("id initCommande", this.id_initCommande);
    this.getAllPanierCommandeByFournisseur();
  }
  infoBonCommande:any
  getAllPanierCommandeByFournisseur() {
    console.log("ID Fournisseur", this.id_initCommande);

    this.service.getOne('panierCommande', 'getOne.php', this.id_initCommande).subscribe({
      next: (reponse: any) => {
        console.log('Panier Commande : ', reponse);
        this.infoBonCommande = reponse;

        // ✅ Stocker id_initCommande pour l'utiliser plus tard
        // this.initCommande_id = reponse.data.initCommande_id;
        // console.log('Id de Init Commande', this.initCommande_id);
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

// Fonction pour imprimer le bon de commande
print(): void {
  setTimeout(() => {
    window.print();
  }, 500);
}


}

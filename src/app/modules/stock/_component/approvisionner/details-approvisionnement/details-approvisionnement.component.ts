import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Component({
  selector: 'app-details-approvisionnement',
  templateUrl: './details-approvisionnement.component.html',
  styleUrls: ['./details-approvisionnement.component.scss']
})
export class DetailsApprovisionnementComponent {
  title: string = 'Bon de Commande';
  montantRestant: number = 0;
  montantPaye: number = 0;
  montantPaiement: number = 0;
  modePaiement: string = 'cash';
  descriptions: string = 'Paiement Fournisseurs';
  created_by = localStorage.getItem('id_user');
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
  infoFacture: any;
  paiements: any[] = [];
  getPaiements() {
    this.service.getOne('paiement', 'getPaiements.php', this.id_initCommande).subscribe({
      next: (response: any) => {
        console.log('Paiements : ', response);
        this.montantRestant = response.montantRestant || 0;

        this.montantPaye = response.totalPaye || 0;
        this.paiements = response.paiements;
       // this.calculerMontantRestant();
      },
      error: (err: any) => {
        console.log('Erreur récupération paiements : ', err);
      }
    });
  }

  calculerMontantRestant() {
    this.montantRestant = this.infoFacture?.montant_global - this.montantPaye;
  }
 payerFacture() {
    if (this.montantPaiement <= 0 || this.montantPaiement > this.montantRestant) {
      this.snackBar.open('Montant invalide', 'Fermer', { duration: 3000 });
      return;
    }

    const paiementData = {
      id_initCommande: this.id_initCommande,
      montant: this.montantPaiement,
      modePaiement: this.modePaiement,
      descriptions: this.descriptions,
      created_by: this.created_by
    };
    const formData = convertObjectInFormData(paiementData);
    this.service.create('paiement', 'payer.php', formData).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur : ', response);
        this.snackBar.open('Paiement effectué avec succès', 'Fermer', { duration: 3000 });
        this.getPaiements(); // Recalculer les montants après paiement
        this.montantPaiement = 0; // Réinitialiser le champ
      },
      error: (err: any) => {
        this.snackBar.open('Erreur lors du paiement', 'Fermer', { duration: 3000 });
      }
    });
  }
// Fonction pour imprimer le bon de commande
print(): void {
  setTimeout(() => {
    window.print();
  }, 500);
}


}

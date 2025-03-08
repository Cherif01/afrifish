import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-details-fournisseur',
  templateUrl: './details-fournisseur.component.html',
  styleUrls: ['./details-fournisseur.component.scss']
})
export class DetailsFournisseurComponent {
  title: string = 'Details Fournisseurs';
  montantRestant: number = 0;
  montantPaye: number = 0;
  montantPaiement: number = 0;
  modePaiement: string = 'cash';
  descriptions: string = 'Paiement Fournisseurs';
  created_by = localStorage.getItem('id_user');
   constructor(
      private activeroute: ActivatedRoute,
      private service: HomeService,
       private snackBar: MatSnackBar,
       private dialog: MatDialog,
      private router : Router
    ) {}
    id: any
ngOnInit(){
  (this.id = this.activeroute.snapshot.params['id']),
  this.getFournisseurById()
}
infoFournisseur: any
getFournisseurById(){
  this.service.getOne('fournisseur','getOne.php',this.id).subscribe({
    next: (reponse: any) => {
      this.infoFournisseur = reponse.fournisseur;
      console.log('Fournisseur : ', this.infoFournisseur);
    } ,
    error: (err: any) => {
      console.log('REPONSE ERROR : ', err);
    },
  })
}
listeApprovisionnements: any[] = [];
getApprovisionnements() {
  this.service.getOne('approvisionnements', 'getByFournisseur.php', this.id).subscribe({
    next: (response: any) => {
      this.listeApprovisionnements = response.approvisionnements;
    },
    error: (err: any) => {
      console.log('Erreur : ', err);
    }
  });
}
 infoFacture: any;
  paiements: any[] = [];
  id_initCommande: any
  getPaiements() {
    this.service.getOne('paiement', 'getPaiements.php', this.id).subscribe({
      next: (response: any) => {
        console.log('Paiements : ', response);
        this.montantRestant = response.montantRestant || 0;

        this.montantPaye = response.totalPaye || 0;
        this.paiements = response.paiements;
        this.id_initCommande = response.id_initCommande;
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

}

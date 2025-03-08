import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { convertObjectInFormData } from 'src/app/app.component';

@Component({
  selector: 'app-facture-vente',
  templateUrl: './facture-vente.component.html',
  styleUrls: ['./facture-vente.component.scss']
})
export class FactureVenteComponent {
  id_venteInit: any;
  infoFacture: any;
  montantRestant: number = 0;
  montantPaye: number = 0;
  montantPaiement: number = 0; // Pour stocker le montant que l'utilisateur veut payer
  modePaiement: string = 'cash'; // Mode de paiement sélectionné
  descriptions: string = 'Paiement Factures'; // Mode de paiement sélectionné
  created_by = localStorage.getItem('id_user');
  constructor(
    private router: Router,
    private service: HomeService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  paiements: any[] = [];
  displayedColumns: string[] = ['id','date', 'montant', 'modePaiement', 'effectue_par'];

  ngOnInit(): void {
    this.id_venteInit = this.activeRoute.snapshot.params['id'];
    console.log("ID Vente :", this.id_venteInit);
    this.getAllPanierCommandeByFournisseur();
  }

  getAllPanierCommandeByFournisseur() {
    this.service.getOne('panierVente', 'getOne.php', this.id_venteInit).subscribe({
      next: (reponse: any) => {
        console.log('Détails de la facture : ', reponse);
        this.infoFacture = reponse;
        this.getPaiements(); // Récupérer les paiements une fois la facture chargée
      },
      error: (err: any) => {
        console.log('Erreur : ', err);
      }
    });
  }

  getPaiements() {
    this.service.getOne('paiement', 'getPaiements.php', this.id_venteInit).subscribe({
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
      id_initVente: this.id_venteInit,
      montant: this.montantPaiement,
      modePaiement: this.modePaiement,
      descriptions: this.descriptions,
      created_by: this.created_by // Remplace par l'ID de l'utilisateur connecté
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

  print(section: 'facture' | 'historique'): void {
    setTimeout(() => {
      if (section === 'facture') {
        document.querySelector('.bon-de-commande')?.classList.add('print-container');
        document.querySelector('.historique-paiements')?.classList.remove('print-container');
      } else {
        document.querySelector('.historique-paiements')?.classList.add('print-container');
        document.querySelector('.bon-de-commande')?.classList.remove('print-container');
      }
      window.print();
    }, 300);
  }

}

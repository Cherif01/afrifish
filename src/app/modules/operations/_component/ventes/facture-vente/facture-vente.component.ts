import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-facture-vente',
  templateUrl: './facture-vente.component.html',
  styleUrls: ['./facture-vente.component.scss']
})
export class FactureVenteComponent {
   constructor(private router: Router,
      private service :HomeService,
      private activeRoute:ActivatedRoute
    ){

    }
    id_venteInit: any
    ngOnInit(): void {
      (this.id_venteInit = this.activeRoute.snapshot.params['id'])
      console.log("id initCommande", this.id_venteInit);
      this.getAllPanierCommandeByFournisseur();
    }
    infoFacture:any
    getAllPanierCommandeByFournisseur() {
      console.log("ID Fournisseur", this.id_venteInit);

      this.service.getOne('panierVente', 'getOne.php', this.id_venteInit).subscribe({
        next: (reponse: any) => {
          console.log('Panier Commande : ', reponse);
          this.infoFacture = reponse;

          // ✅ Stocker id_venteInit pour l'utiliser plus tard
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
    window.print();
  }

}

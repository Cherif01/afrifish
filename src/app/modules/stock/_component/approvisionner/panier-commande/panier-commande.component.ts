import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Component({
  selector: 'app-panier-commande',
  templateUrl: './panier-commande.component.html',
  styleUrls: ['./panier-commande.component.scss']
})
export class PanierCommandeComponent {
title: string = 'Panier de Commande';
  created_by = localStorage.getItem('id_user');
  PanierCommande = new FormGroup({
    id_article: new FormControl('', Validators.required),
    id_initCommande: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    table: new FormControl('article', Validators.required),
   // created_by: new FormControl(this.created_by, Validators.required), // Champ utilisateur créé
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'designation', 'puInitial', 'qteInitiale','actions'];

  displayedColumns2 : string[] = ['id', 'designation',  'quantite'];
  dataSource2 : any = new MatTableDataSource([]);
  constructor(
    private activeroute: ActivatedRoute,
    private service: HomeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router : Router
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource2.paginator = this.paginator
  this.dataSource2.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage()
    }
  }
  id_fournisseur: any;
 id_initCommande: any
 initCommande_id: any
 ngOnInit(): void {
  // this.activeroute.params.subscribe(params => {
  //   this.id_initCommande = params['id_commande']; // Assigne l'ID correctement
  //   console.log("ID de la commande récupéré :", this.id_initCommande);
  //   if (this.id_initCommande) {
  //     this.getAllPanierCommandeByFournisseur(); // Charge les données si l'ID est valide
  //   }
  // });
  (this.id_initCommande = this.activeroute.snapshot.params['id_commande'])
  console.log("ID de la commande récupéré :", this.id_initCommande);
  this.getArticle();
  this.getAllPanierCommandeByFournisseur();
}


  getArticle() {
    this.service.getByCreated('article', 'readAll.php',this.created_by).subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  getAllPanierCommandeByFournisseur() {
    if (!this.id_initCommande) {
      console.warn("Impossible de récupérer les commandes : ID InitCommande manquant !");
      return;
    }
    this.service.getOne('panierCommande', 'getOne.php', this.id_initCommande).subscribe({
      next: (reponse: any) => {
        if (reponse.status === 1) {
          console.log('Panier Commande : ', reponse);
          this.dataSource2.data = reponse.articles;
          this.initCommande_id = reponse.initCommande_id;
        } else {
          console.warn('Aucune commande trouvée avec cet ID.');
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération du panier :', err);
      }
    });
  }
  

  ajouterPanier(article: any) {
    if (!this.id_initCommande) {
      this.snackBar.open('Erreur : ID InitCommande introuvable !', 'Fermer', { duration: 3000 });
      return;
    }
  
    const commande = {
      id_article: article.id,
      quantite: article.qteInitiale,
      id_initCommande: this.id_initCommande, // S'assurer que c'est bien défini
      created_by: this.created_by,
      table: 'paniercommande',
    };
    this.service.create('public', 'create.php', convertObjectInFormData(commande)).subscribe({
      next: () => {
        this.snackBar.open(`Commande pour ${article.designation} ajoutée au panier !`, 'Fermer', { duration: 3000 });
        this.getAllPanierCommandeByFournisseur();
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'ajout de la commande', err);
        this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 3000 });
      }
    });
  }
  
  validerCommande() {

const commande = {
  id : this.id_initCommande ,
  statut :'terminer',
  created_by: this.created_by,
}

    // Convertir en FormData pour l'envoi
    const formData = convertObjectInFormData(commande);


    // Envoyer la commande au backend
    this.service.create('initCommande', 'update.php', formData).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur :', response);
        this.snackBar.open('Commande validée avec succès !', 'Fermer', { duration: 3000 });

        // Rafraîchir la liste du panier après validation

        this.router.navigate(['/stock/list-aprovisionnement'])
      },
      error: (err: any) => {
        console.error('Erreur lors de la validation de la commande', err);
        this.snackBar.open('Erreur lors de la validation', 'Fermer', { duration: 3000 });
      },
    });
  }


  supprimerArticle(article: any) {
    if (!article.id) {
      this.snackBar.open('Erreur : ID article introuvable !', 'Fermer', { duration: 3000 });
      return;
    }

    this.dialog
      .open(DefaultDeleteComponent, {
        disableClose: true,
        data: {
          title: 'Suppression demandée!',
          message: `Voulez-vous vraiment supprimer l'article "${article.designation}" ?`,
          messageNo: 'Annuler',
          messageYes: 'Oui, Supprimer !',
        },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.service.delete('public', 'delete.php', 'paniercommande', article.id).subscribe({
            next: (response: any) => {
              this.snackBar.open(`Article "${article.designation}" supprimé du panier !`, 'Fermer', {
                duration: 3000,
                panelClass: response.status == 1 ? 'bg-success text-white' : 'bg-danger text-white',
              });

              // Mise à jour de la liste après suppression
              this.getAllPanierCommandeByFournisseur();
            },
            error: (err: any) => {
              console.error('Erreur lors de la suppression de l\'article', err);
              this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
            },
          });
        }
      });
  }
  // ajouter(article: any) {
  //   if (!this.id_initCommande) {
  //     this.snackBar.open('Erreur : ID InitCommande introuvable !', 'Fermer', { duration: 3000 });
  //     return;
  //   }

  //   // Vérifier si l'article est déjà dans le panier
  //   const existingArticle = this.dataSource2.data.find((item: any) => item.id_article === article.id);

  //   if (existingArticle) {
  //     // Mettre à jour la quantité de l'article existant
  //     const updatedQuantity = existingArticle.quantite + article.qteInitiale;

  //     const updatedCommande = {
  //       id: existingArticle.id,  // ID de l'article dans le panier
  //       quantite: updatedQuantity,
  //       table: 'paniercommande'
  //     };

  //     console.log('Mise à jour de la quantité:', updatedCommande);

  //     // Mise à jour de l'article via le backend
  //     const formData = convertObjectInFormData(updatedCommande);
  //     this.service.create('public', 'update.php', formData).subscribe({
  //       next: () => {
  //         this.snackBar.open(Quantité mise à jour pour ${article.designation} !, 'Fermer', { duration: 3000 });
  //         this.getAllPanierCommandeByFournisseur();
  //       },
  //       error: (err: any) => {
  //         console.error('Erreur lors de la mise à jour de la quantité', err);
  //         this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 3000 });
  //       }
  //     });
  //   } else {
  //     // Ajouter un nouvel article au panier
  //     const nouvelleCommande = {
  //       id_article: article.id,
  //       quantite: article.qteInitiale,
  //       id_initCommande: this.id_initCommande,
  //       created_by: this.created_by,
  //       table: 'paniercommande',
  //     };

  //     console.log('Ajout de la commande:', nouvelleCommande);

  //     const formData = convertObjectInFormData(nouvelleCommande);
  //     this.service.create('public', 'create.php', formData).subscribe({
  //       next: () => {
  //         this.snackBar.open(Commande pour ${article.designation} ajoutée au panier !, 'Fermer', { duration: 3000 });
  //         this.getAllPanierCommandeByFournisseur();
  //       },
  //       error: (err: any) => {
  //         console.error('Erreur lors de l\'ajout de la commande', err);
  //         this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 3000 });
  //       }
  //     });
  //   }
  // }


}

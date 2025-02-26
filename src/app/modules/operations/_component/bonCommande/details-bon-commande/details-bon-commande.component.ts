import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-details-bon-commande',
  templateUrl: './details-bon-commande.component.html',
  styleUrls: ['./details-bon-commande.component.scss']
})
export class DetailsBonCommandeComponent {
title: string = 'Panier de Commande'
created_by =localStorage.getItem('id_user');
 dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'designation','quantite','prix_unitaire', 'quantite_Disponible','actions'];


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

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
 // id_fournisseur: any;
 id_initCommande: any
  ngOnInit(): void {
    (this.id_initCommande = this.activeroute.snapshot.params['id'])
    console.log("id initCommande", this.id_initCommande);

    // this.PanierCommande.patchValue({
    //   id_initCommande: this.initCommande_id
    // });

    this.getAllPanierCommandeByFournisseur();
  }


  getAllPanierCommandeByFournisseur() {
    console.log("ID Fournisseur", this.id_initCommande);

    this.service.getOne('panierCommande', 'getOne.php', this.id_initCommande).subscribe({
      next: (reponse: any) => {
        console.log('Panier Commande : ', reponse.articles);

        // Initialiser les champs modifiables avec les valeurs par défaut
        this.dataSource.data = reponse.articles
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

id :any
ajouterPanier(article: any) {
  if (!this.id_initCommande) {
    this.snackBar.open('Erreur : ID InitCommande introuvable !', 'Fermer', { duration: 3000 });
    return;
  }

  const commande = {
    id: article.id,
    quantite_disponible: article.quantite_Disponible, // Nouvelle valeur
    prix_unitaire: article.prix_unitaire, // Nouvelle valeur
    id_initCommande: this.id_initCommande,
    created_by: this.created_by,
    table: 'paniercommande',
  };

  console.log('Commande envoyée', commande);
  const formData = convertObjectInFormData(commande);

  this.service.create('public', 'update.php', formData).subscribe({
    next: (response: any) => {
      console.log('Commande envoyée', response);
      this.snackBar.open(`Commande pour ${article.designation} ajoutée au panier !`, 'Fermer', { duration: 3000 });
      this.getAllPanierCommandeByFournisseur();
    },
    error: (err: any) => {
      console.error('Erreur lors de l\'enregistrement de la commande', err);
      this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000 });
    }
  });
}

  validerCommande() {

const commande = {
  id : this.id_initCommande ,
  statut :'en attente',
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
 print(): void {
   window.print();
 }
}

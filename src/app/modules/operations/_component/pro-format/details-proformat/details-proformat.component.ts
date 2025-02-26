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
  selector: 'app-details-proformat',
  templateUrl: './details-proformat.component.html',
  styleUrls: ['./details-proformat.component.scss']
})
export class DetailsProformatComponent {
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
       this.dataSource.data = reponse.articles;

        // ✅ Stocker id_initCommande pour l'utiliser plus tard
        // this.initCommande_id = reponse.data.initCommande_id;
        // console.log('Id de Init Commande', this.initCommande_id);
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  validerArticle(article: any) {
    const articleValide = {
      id: article.id,
     // id_initCommande: this.id_initCommande,
      designation: article.designation,
      quantite: article.quantite,
      prix_unitaire: article.prix_unitaire,
    //  statut: 'valide',
      created_by: this.created_by
    };

    const formData = convertObjectInFormData(articleValide);

    this.service.create('article', 'update.php', formData).subscribe({
      next: (response: any) => {
        console.log('Article validé et ajouté au stock :', response);
        this.snackBar.open('Article validé avec succès !', 'Fermer', { duration: 3000 });

        // Supprimer l'article validé de la liste affichée
        this.dataSource.data = this.dataSource.data.filter((a: any) => a.id !== article.id);
      },
      error: (err: any) => {
        console.error('Erreur lors de la validation de l\'article', err);
        this.snackBar.open('Erreur lors de la validation', 'Fermer', { duration: 3000 });
      },
    });
  }

  rejeterArticle(article: any) {
    const articleRejete = {
      id: article.id,
      id_initCommande: this.id_initCommande,
      statut: 'rejete',
      created_by: this.created_by
    };

    const formData = convertObjectInFormData(articleRejete);

    this.service.create('initCommande', 'update.php', formData).subscribe({
      next: (response: any) => {
        console.log('Article rejeté :', response);
        this.snackBar.open('Article rejeté avec succès !', 'Fermer', { duration: 3000 });

        // Supprimer l'article rejeté de la liste affichée
        this.dataSource.data = this.dataSource.data.filter((a: any) => a.id !== article.id);
      },
      error: (err: any) => {
        console.error('Erreur lors du rejet de l\'article', err);
        this.snackBar.open('Erreur lors du rejet', 'Fermer', { duration: 3000 });
      },
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
  rejeterCommande() {

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
        this.snackBar.open('Commande Rejeter avec succès !', 'Fermer', { duration: 3000 });

        // Rafraîchir la liste du panier après validation

        this.router.navigate(['/operation/pro-format'])
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

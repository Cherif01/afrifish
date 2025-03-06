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

@Component({
  selector: 'app-add-ventes',
  templateUrl: './add-ventes.component.html',
  styleUrls: ['./add-ventes.component.scss']
})
export class AddVentesComponent {
  title ='Gestions Des Ventes'
  created_by = localStorage.getItem('id_user');
   PanierVente = new FormGroup({
     id_article: new FormControl('', Validators.required),
     id_initVente: new FormControl('', Validators.required),
     quantite: new FormControl('', Validators.required),
     table: new FormControl('article', Validators.required),
    created_by: new FormControl(this.created_by, Validators.required), // Champ utilisateur créé
   });
   dataSource = new MatTableDataSource([]);
   displayedColumns: string[] = ['id', 'designation', 'pvInitial', 'qteInitiale','quantite_vente','actions'];

   displayedColumns2 : string[] = ['id', 'designation', 'quantite_vente','prix_de_vente'];
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
     this.dataSource2.paginator = this.paginator;
     this.dataSource2.sort = this.sort;

   }
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
     this.dataSource2.filter = filterValue.trim().toLowerCase();

     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
     if (this.dataSource2.paginator) {
       this.dataSource2.paginator.firstPage();
     }

   }
  // id_client: any;
  id_initVente: any
   ngOnInit(): void {
     (this.id_initVente = this.activeroute.snapshot.params['id_vente'])
     console.log("id initVente", this.id_initVente);

     // this.PanierVente.patchValue({
     //   id_initVente: this.initVente_id
     // });
     this.getArticle(),
     this.getAllPanierVenteByClient();
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
   getAllPanierVenteByClient() {
     console.log("ID Init Vente", this.id_initVente);

     this.service.getOne('panierVente', 'getOne.php', this.id_initVente).subscribe({
       next: (reponse: any) => {
         console.log('Panier Vente : ', reponse);
        this.dataSource2.data = reponse.articles;

         // ✅ Stocker id_initVente pour l'utiliser plus tard
         this.id_initVente = reponse.initVente_id;
         console.log('Id de Init Vente', this.id_initVente);
       },
       error: (err: any) => {
         console.log('REPONSE ERROR : ', err);
       },
     });
   }
   isValiderDisabled(): boolean {
    
    const panierVide = this.dataSource2.data.length === 0;


    const champsNonRemplis = this.dataSource.data.some((article: any) =>
      !article.quantite_vente || !article.pvInitial || article.quantite_vente <= 0 || article.pvInitial <= 0
    );

    return panierVide || champsNonRemplis;
  }

   ajouterPanier(article: any) {
     if (!this.id_initVente) {
       this.snackBar.open('Erreur : ID InitVente introuvable !', 'Fermer', { duration: 3000 });
       return;
     }

     const vente = {
       id_article: article.id,
       quantite: article.qteInitiale,
       prixVente: article.pvInitial,
       id_initVente: this.id_initVente,
       quantite_vente : article.quantite_vente,
       created_by: this.created_by,
       table :'paniervente',
     };
     console.log('Vente envoyée', vente);
     const formData = convertObjectInFormData(vente);

     console.log('Vente envoyée', formData);
     this.service.create('public', 'create.php', formData).subscribe({
       next: (response: any) => {
         this.snackBar.open(`Vente pour ${article.designation} Ajouter au panier !`, 'Fermer', { duration: 3000 })
         this.getAllPanierVenteByClient();
       }

       ,
       error: (err: any) => {
         console.error('Erreur lors de l\'enregistrement de la Vente', err);
         this.snackBar.open('Erreur lors de l\'enregistrement', 'Fermer', { duration: 3000 });
       }
     });
   }
   validerVente() {
    const vente = { idVente: this.id_initVente };

    const formData = convertObjectInFormData(vente);

    this.service.create('initVente', 'validationVente.php', formData).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur :', response);
        this.snackBar.open('Vente validée avec succès !', 'Fermer', { duration: 3000 });
        this.router.navigate(['/operation/list-vente']);
      },
      error: (err: any) => {
        console.error('Erreur lors de la validation de la vente', err);
        this.snackBar.open('Erreur lors de la validation', 'Fermer', { duration: 3000 });
      },
    });
  }

}

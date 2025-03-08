import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Component({
  selector: 'app-facture-proformat',
  templateUrl: './facture-proformat.component.html',
  styleUrls: ['./facture-proformat.component.scss']
})
export class FactureProformatComponent {

   title: string = 'Facture Pro Format';
   created_by = localStorage.getItem('id_user');
   modify_by = localStorage.getItem('id_user');
   Zones = new FormGroup({
     libelle: new FormControl('', Validators.required),
     id_devise: new FormControl('', Validators.required),
     table: new FormControl('entite', Validators.required),
     created_by: new FormControl(this.created_by, Validators.required),
   });
   dataSource = new MatTableDataSource([]);
   displayedColumns: string[] = [
    'id',
    'created_at',
    'representant',
    'statut',
    'actions'
  ];

   constructor(
     private service: HomeService,
     private snackBar: MatSnackBar,
     private dialog: MatDialog,
      private authService :AuthserviceService,
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

   ngOnInit(): void {
     this.getBonCommande();
     this.getUserConnect()
   }
   InfoUser: any = {};
   privilege: any;
 getUserConnect() {
   this.authService.getClauseID('utilisateur', 'getOne.php', this.created_by).subscribe({
     next: (response: any) => {
       this.InfoUser = response;
       this.privilege = response.privilege;
     },
     error: (error: any) => {
       console.log('Erreur : ', error);
     },
   });
 }

   getBonCommande() {
     this.service.getByCreated('initCommande', 'initAttente.php',this.created_by).subscribe({
       next: (reponse: any) => {
         console.log('REPONSE SUCCESS : ', reponse);
         this.dataSource.data = reponse;
       },
       error: (err: any) => {
         console.log('REPONSE ERROR : ', err);
       },
     });
   }
   validerCommande(idCommande: number) {

const commande = {
  idCommande : idCommande ,
  modify_by: this.modify_by,
}
    const formData = convertObjectInFormData(commande);


    this.service.create('initCommande','validationCommande.php', formData).subscribe({
      next: (response: any) => {
          console.log('Response',response);

        if (response.success) {
          this.snackBar.open('Commande validée avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.getBonCommande(); // Rafraîchir la liste des commandes
        } else {
          this.snackBar.open(response.error, 'Fermer', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      },
      error: (err: any) => {
        console.error('Erreur :', err);
        this.snackBar.open('Une erreur est survenue', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

}

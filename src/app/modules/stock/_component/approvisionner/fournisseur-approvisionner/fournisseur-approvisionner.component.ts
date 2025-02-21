import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-fournisseur-approvisionner',
  templateUrl: './fournisseur-approvisionner.component.html',
  styleUrls: ['./fournisseur-approvisionner.component.scss']
})
export class FournisseurApprovisionnerComponent {
  title: string = 'Gestion des entites';
 dataSource = new MatTableDataSource([]);
    displayedColumns: string[] = ['id', 'raison_sociale', 'representant','adresse', 'actions'];

    constructor(
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

    ngOnInit(): void {
      this.getFournisseur();
    }

    getFournisseur() {
      this.service.getall('fournisseur', 'readAll.php').subscribe({
        next: (reponse: any) => {
          console.log('REPONSE SUCCESS : ', reponse);
          this.dataSource.data = reponse;
        },
        error: (err: any) => {
          console.log('REPONSE ERROR : ', err);
        },
      });
    }
    getOneInitCommande(id : any){
      console.log('ID du fournisseurrrrrrrrrrrrrrrrrrrrrrrrr : ', id);
      this.service.getOne('initCommande', 'getOneByFournisseur.php', id).subscribe({
        next: (response: any) => {
          console.log('Info : ', response);

          if(response.data.statut == "En cours"){
            console.log("Entrer dans if id", response.data.id);
            this.router.navigate(['/stock/panier_commande/:id'])
          }
          else{
            this.router.navigate(['/stock/init-commande/:id'])
          }
        },
        error: (error: any) => {
          console.log("Entrer dans ERROR");
          this.router.navigate(['/stock/init-commande/:id'])
          },
      });
    }
}

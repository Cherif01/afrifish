import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-client-vente',
  templateUrl: './client-vente.component.html',
  styleUrls: ['./client-vente.component.scss']
})
export class ClientVenteComponent {
title: string = 'Gestion des Client';

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'libelle', 'pays', 'actions'];

  constructor(
    private service: HomeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router :Router
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
    this.getClient();
  }
created_by =localStorage.getItem('id_user')
  getClient() {
    this.service.getByCreated('client', 'readAll.php',this.created_by).subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

  id_initVente :any
  getAllPanierVenteByClient() {
    console.log("ID Init Vente", this.id_initVente);

    this.service.getOne('panierVente', 'getOne.php', this.id_initVente).subscribe({
      next: (reponse: any) => {
        console.log('Panier Vente : ', reponse);


        // ✅ Stocker id_initVente pour l'utiliser plus tard
        this.id_initVente = reponse.initVente_id;
        console.log('Id de Init Vente', this.id_initVente);
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  getOneInitVente(id: any) {
    if (!id) {
      console.error("ID du Client invalide :", id);
      return;
    }


    console.log('ID du Client : ', id);
    this.service.getOne('initVente', 'verifVente.php', id).subscribe({
      next: (response: any) => {
        console.log('Info : ', response);

        if (response.status === 1 ) {
         // console.log("Redirection vers panier-vente avec ID", response.data.initvente_id);
          this.router.navigate(['/operation/panier-vente', response.data]);
        }  else {
          console.log("Réponse invalide, redirection vers init-vente");
          this.router.navigate(['/operation/init-vente', id]);
        }
      },
      error: (error: any) => {
        console.error("Erreur API, redirection vers init-vente", error);
        this.router.navigate(['/operation/init-vente', id]);
      },

    });
  }

}

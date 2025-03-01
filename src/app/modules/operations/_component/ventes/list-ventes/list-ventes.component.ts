import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Component({
  selector: 'app-list-ventes',
  templateUrl: './list-ventes.component.html',
  styleUrls: ['./list-ventes.component.scss']
})
export class ListVentesComponent {
   title: string = 'Gestion des Ventes';
    created_by = localStorage.getItem('id_user');
    PanierVente = new FormGroup({
      id_article: new FormControl('', Validators.required),
      id_initVente: new FormControl('', Validators.required),
      table: new FormControl('panierVente', Validators.required),
      created_by: new FormControl(this.created_by, Validators.required),
    });
    dataSource = new MatTableDataSource([]);
    displayedColumns: string[] = ['id', 'Nomcompletclient',  'statut', 'actions'];


    constructor(
      private service: HomeService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
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
      this.getVente();
    }

    getVente() {
      this.service.getByCreated('initVente', 'readAll.php',this.created_by).subscribe({
        next: (reponse: any) => {
           console.log('REPONSE SUCCESS : ', reponse);
          this.dataSource.data = reponse;
        },
        error: (err: any) => {
          console.log('REPONSE ERROR : ', err);
        },
      });
    }

    onAjouter() {
      if (this.PanierVente.valid) {
        const formData = convertObjectInFormData(this.PanierVente.value);
        this.service.create('public', 'create.php', formData).subscribe({
          next: (response) => {
            const message =
              response?.message || 'PanierVente  Enregistrer avec succès !';
            this.snackBar.open(message, 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['bg-success', 'text-white'],
            });
            this.PanierVente.reset();
            this.getVente();
          },
          error: (err) => {
            this.snackBar.open('Erreur, Veuillez reessayer!', 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['bg-danger', 'text-white'],
            });
            console.log('Error : ', err);
          },
        });
      }
    }
    deleteFunction(id: any, table: string) {
      this.dialog
        .open(DefaultDeleteComponent, {
          disableClose: true,
          data: {
            title: 'Suppression demandée!',
            message: 'Voulez-vous vraiment supprimer cet élément ?',
            messageNo: 'Non ?',
            messageYes: 'Oui, Confirmer !',
          },
        })
        .afterClosed()
        .subscribe((data: any) => {
          if (data) {
            this.service.delete('public', 'delete.php', table, id).subscribe({
              next: (response: any) => {
                const messageClass =
                  response.status == 1
                    ? ['bg-success', 'text-white']
                    : ['bg-danger', 'text-white'];
                this.snackBar.open(response.message, 'Okay', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: messageClass,
                });
              },
              error: (err: any) => {
                console.error('Error : ', err);
              },
            });
            this.getVente();
          }
        });
    }
}

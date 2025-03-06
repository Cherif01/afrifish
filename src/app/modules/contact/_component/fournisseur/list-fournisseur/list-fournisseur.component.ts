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
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent {
   title: string = 'Gestion des Fournisseurs';
    created_by = localStorage.getItem('id_user');
    Fournisseur = new FormGroup({
      raison_sociale: new FormControl('', Validators.required),
      nom_representant: new FormControl('', Validators.required),
      prenom_representant: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      table: new FormControl('fournisseur', Validators.required),
     created_by: new FormControl(this.created_by, Validators.required),
    });
    dataSource = new MatTableDataSource([]);
    displayedColumns: string[] = ['id', 'raison_sociale', 'nom_representant','adresse', 'actions'];
    selectedFournisseurId: number | null = null;
    editFournisseur(fournisseur: any) {
      this.selectedFournisseurId = fournisseur.id;
      this.Fournisseur.patchValue({
        raison_sociale: fournisseur.raison_sociale,
        nom_representant: fournisseur.nom_representant,
        prenom_representant: fournisseur.prenom_representant,
        telephone: fournisseur.telephone,
        adresse: fournisseur.adresse,
        pays: fournisseur.pays,
      });
    }

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
    onModifier() {
      if (this.Fournisseur.valid && this.selectedFournisseurId !== null) {
        const formData = convertObjectInFormData({
          ...this.Fournisseur.value,
          id: this.selectedFournisseurId
        });

        this.service.update('public', 'update.php', formData).subscribe({
          next: (response) => {
            console.log('Mise à jour :', response);
            this.snackBar.open('Fournisseur mis à jour avec succès !', 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['bg-success', 'text-white'],
            });

            this.Fournisseur.reset({ table: 'fournisseur' });
            this.selectedFournisseurId = null;
            this.getFournisseur();
          },
          error: (err) => {
            this.snackBar.open('Erreur lors de la mise à jour !', 'Okay', {
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

    onAjouter() {
      if (this.Fournisseur.valid) {
        const formData = convertObjectInFormData(this.Fournisseur.value);
        this.service.create('public', 'create.php', formData).subscribe({
          next: (response) => {
            console.log('Fournisseur',response);

            const message =
              response?.message || 'Fournisseur  Enregistrer avec succès !';
            this.snackBar.open(message, 'Okay', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['bg-success', 'text-white'],
            });
            this.Fournisseur.reset(
              {
                table: 'fournisseur',
                created_by :this.created_by
              }
            );
            this.getFournisseur();
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
            this.getFournisseur();
          }
        });
    }
}

import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-entite',
  templateUrl: './entite.component.html',
  styleUrls: ['./entite.component.scss'],
})
export class EntiteComponent {
  title: string = 'Gestion des entites';
  created_by = localStorage.getItem('id_user');
  selectedEntiteId: number | null = null;
  Entite = new FormGroup({
    reference: new FormControl('', Validators.required),
    codeEntite: new FormControl('', Validators.required),
    table: new FormControl('entite', Validators.required),
    created_by: new FormControl(this.created_by, Validators.required),
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'reference', 'codeEntite', 'actions'];


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
  editEntite(entite: any) {
    this.selectedEntiteId = entite.id;
    this.Entite.patchValue({
      reference: entite.reference,
      codeEntite: entite.codeEntite,
    });
  }

  ngOnInit(): void {
    this.getEntite();
  }
id_utilisateur =localStorage.getItem('id_user')
  getEntite() {
    // console.log('user',this.iid_utilisateur);

    this.service.getone('entite', 'readAll.php',this.id_utilisateur).subscribe({
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
    console.log('valllll',this.Entite.value);

    if (this.Entite.valid) {
      const formData = convertObjectInFormData(this.Entite.value);
      this.service.create('public', 'create.php', formData).subscribe({
        next: (response) => {
          const message =
            response?.message || 'Entite  Enregistrer avec succès !';
          this.snackBar.open(message, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });
          this.Entite.updateValueAndValidity();
          this.Entite.reset();
          this.getEntite();
        },
        error: (err) => {
          this.snackBar.open('Erreur, Veuillez reessayer!', 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['bg-danger', 'text-white'],
          });
          console.log('Error : ', err);
          this.Entite.reset({
            table: 'entite',
          });

        },
      });
    }
  }
  onModifier() {
    if (this.Entite.valid && this.selectedEntiteId !== null) {
      const formData = convertObjectInFormData({
        ...this.Entite.value,
        id: this.selectedEntiteId
      });

      this.service.update('public', 'update.php', formData).subscribe({
        next: (response) => {
          console.log('Mise à jour :', response);
          this.snackBar.open('Entité mise à jour avec succès !', 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });

          this.Entite.reset({ table: 'entite' });
          this.selectedEntiteId = null;
          this.getEntite();
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
          this.getEntite();
        }
      });
  }
}

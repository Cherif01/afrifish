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
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss']
})
export class AffectationComponent {
 title: string = 'Gestion des entites';
  created_by = localStorage.getItem('id_user');
  Affectation = new FormGroup({
    id_entite: new FormControl('', Validators.required),
    id_utilisateur: new FormControl('', Validators.required),
    table: new FormControl('affectation', Validators.required),
    created_by: new FormControl(this.created_by, Validators.required),
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'nom', 'codeEntite', 'actions'];

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
    this.getAffectation();
    this.getUser();
    this.getEntite()
  }

  getAffectation() {
    this.service.getall('affectation', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  users :any
  getUser() {
    this.service.getall('utilisateur', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.users = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  entites :any
  id_utilisateur =localStorage.getItem('id_user')
  getEntite() {
    // console.log('user',this.iid_utilisateur);

    this.service.getone('entite', 'readAll.php',this.id_utilisateur).subscribe({
      next: (reponse: any) => {
         console.log('REPONSE SUCCESS : ', reponse);
        this.entites= reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

  onAjouter() {
    if (this.Affectation.valid) {
      const formData = convertObjectInFormData(this.Affectation.value);
      this.service.create('public', 'create.php', formData).subscribe({
        next: (response) => {
          const message =
            response?.message || 'Affectation  Enregistrer avec succès !';
          this.snackBar.open(message, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });
          this.Affectation.reset(
           { table :'affectation'}
          );
          this.getAffectation();
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
          this.service.delete('agence', 'delete.php', table, id).subscribe({
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
          this.getAffectation();
        }
      });
  }
}

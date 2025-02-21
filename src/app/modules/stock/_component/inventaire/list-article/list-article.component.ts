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
import { AddArticleComponent } from '../../../_dialogs/add-article/add-article.component';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent {
 title: string = 'Gestion des Articles';
  created_by = localStorage.getItem('id_user');
  Zones = new FormGroup({
    libelle: new FormControl('', Validators.required),
    id_devise: new FormControl('', Validators.required),
    table: new FormControl('entite', Validators.required),
    created_by: new FormControl(this.created_by, Validators.required),
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'reference', 'designation', 'puInitial', 'qteInitiale', 'pvInitial', 'actions'];


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
    this.getArticle();
  }

  getArticle() {
    this.service.getall('article', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

  openDialog() {
    this.dialog.open(AddArticleComponent, {
      width: '90%', // Largeur relative
      maxWidth: '600px', // Largeur maximale
      height: '80%', // Hauteur fixe avec espace pour le défilement
      panelClass: 'scrollable-dialog-container', // Classe personnalisée pour le style
    })
    .afterClosed()
    .subscribe((result) => {
      if (result?.event && result.event === "insert") {
        const formData = convertObjectInFormData(result.data);

        // Réinitialisation et insertion des données
        this.dataSource.data.splice(0, this.dataSource.data.length);

        this.service.create('public', 'create.php', formData).subscribe({
          next: (response) => {
            this.snackBar.open("Article enregistré avec succès !", "Okay", {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ['bg-success', 'text-white']
            });
            this.getArticle();
          },
          error: (err: any) => {
            this.snackBar.open("Échec de l'ajout !", "Okay", {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: ['bg-danger', 'text-white']
            });
          }
        });
      }
    });
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
          this.getArticle();
        }
      });
  }
}

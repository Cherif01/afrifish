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
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {
  title: string = 'Gestion des Catégories';
  created_by = localStorage.getItem('id_user');

  // Formulaire de création/modification
  Category = new FormGroup({
    id: new FormControl(null), // Ajout du champ ID pour la modification
    libelle: new FormControl('', Validators.required),
    id_entite: new FormControl('', Validators.required),
    table: new FormControl('categorie', Validators.required),
    created_by: new FormControl(this.created_by, Validators.required),
  });

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'libelle', 'entite', 'actions'];
  entites: any;

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

  ngOnInit(): void {
    this.getCategory();
    this.getEntite();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCategory() {
    this.service.getByCreated('categorie', 'readAll.php', this.created_by).subscribe({
      next: (reponse: any) => {
        console.log('Réponse Catégories : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('Erreur Catégories : ', err);
      },
    });
  }

  getEntite() {
    this.service.getone('entite', 'readAll.php', this.created_by).subscribe({
      next: (reponse: any) => {
        console.log('Réponse Entités : ', reponse);
        this.entites = reponse;
      },
      error: (err: any) => {
        console.log('Erreur Entités : ', err);
      },
    });
  }

  // 🟢 Ajouter une nouvelle catégorie
  onAjouter() {
    if (this.Category.valid) {
      const formData = convertObjectInFormData(this.Category.value);
      this.service.create('public', 'create.php', formData).subscribe({
        next: (response) => {
          this.snackBar.open('Catégorie enregistrée avec succès !', 'OK', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white'],
          });
          this.Category.reset({
            table: 'categorie',
            created_by: this.created_by,
          });
          this.getCategory();
        },
        error: (err) => {
          this.snackBar.open('Erreur, veuillez réessayer!', 'OK', {
            duration: 3000,
            panelClass: ['bg-danger', 'text-white'],
          });
          console.log('Erreur : ', err);
        },
      });
    }
  }

  // 🟡 Modifier une catégorie
  onModifier(category: any) {
    this.Category.patchValue({
      id: category.id,
      libelle: category.libelle,
      id_entite: category.id_entite,
      table: 'categorie',
      created_by: this.created_by,
    });
  }

  // 🔵 Mettre à jour la catégorie
  updateCategory() {
    if (this.Category.valid) {
      const formData = convertObjectInFormData(this.Category.value);
      this.service.update('public', 'update.php', formData).subscribe({
        next: (response) => {
          this.snackBar.open('Catégorie mise à jour avec succès !', 'OK', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white'],
          });
          this.Category.reset({
            table: 'categorie',
            created_by: this.created_by,
          });
          this.getCategory();
        },
        error: (err) => {
          this.snackBar.open('Erreur, veuillez réessayer!', 'OK', {
            duration: 3000,
            panelClass: ['bg-danger', 'text-white'],
          });
          console.log('Erreur : ', err);
        },
      });
    }
  }

  // 🔴 Supprimer une catégorie
  deleteFunction(id: any, table: string) {
    this.dialog
      .open(DefaultDeleteComponent, {
        disableClose: true,
        data: {
          title: 'Suppression demandée!',
          message: 'Voulez-vous vraiment supprimer cet élément ?',
          messageNo: 'Non',
          messageYes: 'Oui, Confirmer !',
        },
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.service.delete('public', 'delete.php', table, id).subscribe({
            next: (response: any) => {
              this.snackBar.open(response.message, 'OK', {
                duration: 3000,
                panelClass: response.status == 1 ? ['bg-success', 'text-white'] : ['bg-danger', 'text-white'],
              });
              this.getCategory();
            },
            error: (err: any) => {
              console.error('Erreur : ', err);
            },
          });
        }
      });
  }
}

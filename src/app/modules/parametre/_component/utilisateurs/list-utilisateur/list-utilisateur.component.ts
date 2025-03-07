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
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent {
  title: string = 'Gestion des Utilisateurs';
  created_by = localStorage.getItem('id_user');
  id_utilisateur = localStorage.getItem('id_user');

  // Formulaire de création/modification
  Utilisateurs = new FormGroup({
    id: new FormControl(null), // Ajout du champ ID pour la modification
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    ville: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    adresse: new FormControl(''),
    mot_de_passe: new FormControl('', [Validators.required, Validators.minLength(4)]),
    privilege: new FormControl('', Validators.required),
  });

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'nom', 'email', 'actions'];

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
    this.getUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUser() {
    this.service.getone('utilisateur', 'readAll.php', this.id_utilisateur).subscribe({
      next: (reponse: any) => {
        console.log('Réponse Utilisateurs : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('Erreur Utilisateurs : ', err);
      },
    });
  }

  // 🟢 Ajouter un nouvel utilisateur
  onAjouter() {
    console.log('Utilisateur à ajouter :', this.Utilisateurs.value);

    if (this.Utilisateurs.valid) {
      const formData = convertObjectInFormData(this.Utilisateurs.value);
      this.service.create('authentification', 'register.php', formData).subscribe({
        next: (response) => {
          this.snackBar.open('Utilisateur enregistré avec succès !', 'OK', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white'],
          });
          this.Utilisateurs.reset();
          this.getUser();
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

  // 🟡 Modifier un utilisateur
  onModifier(user: any) {
    this.Utilisateurs.patchValue({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      telephone: user.telephone,
      email: user.email,
      ville: user.ville,
      pays: user.pays,
      adresse: user.adresse,
      privilege: user.privilege,
      mot_de_passe: '', // Ne pas pré-remplir le mot de passe pour la sécurité
    });
  }

  // 🔵 Mettre à jour l'utilisateur
  updateUser() {
    if (this.Utilisateurs.valid) {
      const formData = convertObjectInFormData(this.Utilisateurs.value);
      this.service.update('authentification', 'update.php', formData).subscribe({
        next: (response) => {
          this.snackBar.open('Utilisateur mis à jour avec succès !', 'OK', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white'],
          });
          this.Utilisateurs.reset();
          this.getUser();
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

  // 🔴 Supprimer un utilisateur
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
          this.service.delete('agence', 'delete.php', table, id).subscribe({
            next: (response: any) => {
              this.snackBar.open(response.message, 'OK', {
                duration: 3000,
                panelClass: response.status == 1 ? ['bg-success', 'text-white'] : ['bg-danger', 'text-white'],
              });
              this.getUser();
            },
            error: (err: any) => {
              console.error('Erreur : ', err);
            },
          });
        }
      });
  }
}

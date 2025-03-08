import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Component({
  selector: 'app-list-approvisionnement',
  templateUrl: './list-approvisionnement.component.html',
  styleUrls: ['./list-approvisionnement.component.scss']
})
export class ListApprovisionnementComponent {
 title: string = 'Gestion des approvisionnement';
  created_by = localStorage.getItem('id_user');
  Zones = new FormGroup({
    libelle: new FormControl('', Validators.required),
    id_devise: new FormControl('', Validators.required),
    table: new FormControl('entite', Validators.required),
    created_by: new FormControl(this.created_by, Validators.required),
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'id',
    'representant',
    'statut',
    'entite',
    'created_at',
    'actions'
  ];

  constructor(
    private service: HomeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog ,
    private router :Router ,
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
    this.getApprovisionnement();
    this.getUserConnect();
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

  getApprovisionnement() {
    this.service.getByCreated('initCommande', 'readAll.php',this.created_by).subscribe({
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
    if (this.Zones.valid) {
      const formData = convertObjectInFormData(this.Zones.value);
      this.service.create('zones', 'create.php', formData).subscribe({
        next: (response) => {
          const message =
            response?.message || 'Zones  Enregistrer avec succès !';
          this.snackBar.open(message, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });
          this.Zones.reset();
          this.getApprovisionnement();
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
          this.getApprovisionnement();
        }
      });
  }


  getOneInitCommande(idFournisseur: number): void {
    if (!idFournisseur) {
      console.error("ID du fournisseur invalide :", idFournisseur);
      return;
    }

    console.log('Vérification de la commande pour le fournisseur ID :', idFournisseur);

    this.service.getOne('initCommande', 'verifInit.php', idFournisseur).subscribe({
      next: (response: any) => {
        console.log('Réponse API :', response);

        if (response.status === 1) {
          this.router.navigate(['/stock/panier-commande', response.data]);
        } else {
          this.router.navigate(['/stock/init-commande', idFournisseur]);
        }
      },
      error: (error: any) => {
        console.error("Erreur API, redirection vers init-commande", error);
        this.router.navigate(['/stock/init-commande', idFournisseur]);
      }
    });
  }


}

import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';
export interface Operation {
  id: number;
  descriptions: string;
  montant: number;
  created_at: string;
  typeOperation?: string;
}
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})


export class HistoriqueComponent implements OnInit {
  title: string = 'Historique des Opérations';
  created_by = localStorage.getItem('id_user');

  // Formulaire pour sélectionner la période
  Rapport = new FormGroup({
    date_debut: new FormControl(null, Validators.required),
    date_fin: new FormControl(null, Validators.required),
  });

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'type','montant', 'descriptions'];

  constructor(
    private service: HomeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

  }

  getHistorique() {
    const { date_debut, date_fin } = this.Rapport.value;
    if (!date_debut || !date_fin) {
      this.snackBar.open('Veuillez sélectionner une période valide.', 'Okay', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['bg-warning', 'text-dark'],
      });
      return;
    }

    const id_entite = localStorage.getItem('id_entite') || null;

    const rapport: any = {
      date_debut: date_debut ? new Date(date_debut).toISOString().split('T')[0] : null,
      date_fin: date_fin ? new Date(date_fin).toISOString().split('T')[0] : null,
      created_by: this.created_by
    };


    if (id_entite) {
      rapport.id_entite = id_entite;
    }
 const   formData =convertObjectInFormData(rapport);
    this.service.create('caisse', 'getRapportByDate.php', formData).subscribe({
      next: (response: { status: number; encaissements: Operation[]; decaissements: Operation[]; paiements: Operation[]; message?: string }) => {
        if (response.status === 1) {
          this.dataSource.data = [
            ...response.encaissements.map((op: Operation) => ({ ...op, type: 'Encaissement' })),
            ...response.decaissements.map((op: Operation) => ({ ...op, type: 'Décaissement' })),
            ...response.paiements.map((op: Operation) => ({ ...op, type: 'Paiement' }))
          ];
        } else {
          this.snackBar.open(response.message ?? 'Aucune donnée trouvée.', 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-warning', 'text-dark'],
          });
          this.dataSource.data = [];
        }
      },
      error: (err) => {
        this.snackBar.open('Erreur lors du chargement des données.', 'Okay', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['bg-danger', 'text-white'],
        });
        console.error('Erreur :', err);
      },
    });
  }

  // 🔹 Appliquer un filtre à la table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.data = this.dataSource.data.filter(transaction =>
      transaction.descriptions.toLowerCase().includes(filterValue) ||
      transaction.type.toLowerCase().includes(filterValue)
    );
  }

  // 🔹 Méthode pour définir les classes CSS en fonction du type de transaction
  getBadgeClass(type: string): string {
    switch (type) {
      case 'Encaissement': return 'bg-success text-white';
      case 'Décaissement': return 'bg-danger text-white';
      case 'Paiement': return 'bg-info text-white';
      default: return 'bg-secondary text-white';
    }
  }
  imprimer() {
    window.print();
  }


}

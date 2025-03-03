import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    // Charger les données initiales avec la date d'aujourd'hui
    // const today = new Date().toISOString().split('T')[0];
    // this.Rapport.setValue({ date_debut: today, date_fin: today });
  //  this.getHistorique();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // 🔹 Appliquer un filtre à la table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // 🔹 Récupérer les données filtrées en fonction des dates
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
  
    const rapport = {
      date_debut: date_debut,
      date_fin: date_fin,
      created_by: this.created_by
    };
  
    this.service.create('rapport', 'rapport.php', rapport).subscribe({
      next: (response: { status: number; encaissements: Operation[]; decaissements: Operation[]; paiements: Operation[]; message?: string }) => {
        console.log('Response Rapport',response);
        
        if (response.status === 1) {
          this.dataSource.data = [
            ...response.encaissements.map((op: Operation) => ({ ...op, type: 'Encaissement' })),
            ...response.decaissements.map((op: Operation) => ({ ...op, type: 'Décaissement' })),
            ...response.paiements.map((op: Operation) => ({ ...op, type: 'Paiement' })),
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
  
}

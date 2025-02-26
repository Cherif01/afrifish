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
  selector: 'app-bon-de-commande',
  templateUrl: './bon-de-commande.component.html',
  styleUrls: ['./bon-de-commande.component.scss']
})
export class BonDeCommandeComponent {
 title: string = 'Gestion des Commandes';
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
      'created_at',
      'actions'
    ];

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
       this.getBonCommande();
     }

     getBonCommande() {
       this.service.getall('initCommande', 'initTerminer.php').subscribe({
         next: (reponse: any) => {
           console.log('REPONSE SUCCESS : ', reponse);
           this.dataSource.data = reponse;
         },
         error: (err: any) => {
           console.log('REPONSE ERROR : ', err);
         },
       });
     }


}

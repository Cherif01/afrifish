import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent {
  created_by = localStorage.getItem('id_user');
     Caisse = new FormGroup({
       typeOperation: new FormControl('', Validators.required),
       montant: new FormControl('', Validators.required),
       descriptions: new FormControl('', Validators.required),
       modeRegler: new FormControl('', Validators.required),
       table: new FormControl('caisse', Validators.required),
       created_by: new FormControl(this.created_by, Validators.required),
     });
     dataSource = new MatTableDataSource([]);
     displayedColumns: string[] = [ 'typeOperation', 'modeRegler','montant','descriptions'];

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
       this.getCaisse();
       this.getTotal()
     }

     getCaisse() {
       this.service.getall('caisse', 'readAll.php').subscribe({
         next: (reponse: any) => {
           console.log('REPONSE SUCCESS : ', reponse);
           this.dataSource.data = reponse;
         },
         error: (err: any) => {
           console.log('REPONSE ERROR : ', err);
         },
       });
     }
     infoCaisse :any
     getTotal() {
       this.service.getall('caisse', 'getCaisse.php').subscribe({
         next: (reponse: any) => {

           this.infoCaisse = reponse.data[0];
           console.log('REPONSE Caisse : ',this.infoCaisse);
         },
         error: (err: any) => {
           console.log('REPONSE ERROR : ', err);
         },
       });
     }

     onAjouter() {
       if (this.Caisse.valid) {
         const formData = convertObjectInFormData(this.Caisse.value);
         this.service.create('Caisse', 'create.php', formData).subscribe({
           next: (response) => {
             const message =
               response?.message || 'Caisse  Enregistrer avec succès !';
             this.snackBar.open(message, 'Okay', {
               duration: 3000,
               horizontalPosition: 'right',
               verticalPosition: 'top',
               panelClass: ['bg-success', 'text-white'],
             });
             this.Caisse.reset();
             this.getCaisse();
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

}

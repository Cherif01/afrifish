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
  
  Zones = new FormGroup({
    libelle: new FormControl('', Validators.required),
    id_devise: new FormControl('', Validators.required),
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'libelle', 'devise', 'actions'];

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
    this.getZone(), this.getDevises();
  }

  getZone() {
    this.service.getall('zones', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  Devises: any = [];
  getDevises() {
    this.service.getall('devise', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.Devises = reponse;
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
          this.getZone();
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
  deleteFunction(id: any, table: string) {}
}

import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  transactions = [
    { id: 'T001', date: '2025-01-16', amount: '500 USD', status: 'Réussi' },
    { id: 'T002', date: '2025-01-15', amount: '1200 USD', status: 'Échoué' },
    { id: 'T003', date: '2025-01-15', amount: '300 USD', status: 'En attente' },
    // Ajoutez plus de données ici
  ];
created_by = localStorage.getItem('id_user');
  displayedColumns: string[] = ['id', 'date', 'amount', 'status'];

  ngOnInit(): void {
    this.getDashboard();
    this.getStatistique();
  }

  constructor(
    private service: HomeService,
    
  ) {}
infoDashTodayBoard:any
infoDashStatistique:any
  // CHARTS
  getDashboard() {
    this.service.getByCreated('dashboard', 'today.php',this.created_by).subscribe({
      next: (reponse: any) => {

        this.infoDashTodayBoard = reponse;
        console.log('REPONSE Dashboard : ',this.infoDashTodayBoard);
        
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
  getStatistique() {
    this.service.getByCreated('dashboard', 'statistique.php',this.created_by).subscribe({
      next: (reponse: any) => {

        this.infoDashStatistique = reponse;
        console.log('REPONSE Dashboard : ',this.infoDashStatistique);
        
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }
}

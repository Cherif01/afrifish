import { Component } from '@angular/core';

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

  displayedColumns: string[] = ['id', 'date', 'amount', 'status'];

  ngOnInit(): void {}

  constructor() {}

  // CHARTS
}

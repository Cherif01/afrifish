import { Component } from '@angular/core';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent {
  transactions = [
    { id: 'T001', date: '2025-01-16', amount: 500, status: 'Réussi' },
    { id: 'T002', date: '2025-01-15', amount: 1200, status: 'Échoué' },
    { id: 'T003', date: '2025-01-15', amount: 300, status: 'En attente' },
    // Ajoutez plus de données ici
  ];

  totalTransactions: number = 0;
  totalAmount: number = 0;
  successCount: number = 0;
  pendingCount: number = 0;

  ngOnInit(): void {
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalTransactions = this.transactions.length;
    this.totalAmount = this.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    this.successCount = this.transactions.filter((t) => t.status === 'Réussi').length;
    this.pendingCount = this.transactions.filter((t) => t.status === 'En attente').length;
  }
}

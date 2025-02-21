import { Component } from '@angular/core';

@Component({
  selector: 'app-bon-de-commande',
  templateUrl: './bon-de-commande.component.html',
  styleUrls: ['./bon-de-commande.component.scss']
})
export class BonDeCommandeComponent {
  // Données dynamiques pour le bon de commande
  orderNumber: string = 'AF12345';
  orderDate: Date = new Date();

  clientName: string = 'Mamadou Keita';
  clientAddress: string = '123 Rue des Poissons, Bamako, Mali';
  clientPhone: string = '+223 76 123 4567';
  clientEmail: string = 'mamadou.keita@example.com';

  // Liste des articles commandés
  orderItems = [
    { product: 'Tilapia frais', quantity: 5, unitPrice: 1500, total: 7500 },
    { product: 'Crevettes', quantity: 2, unitPrice: 5000, total: 10000 },
    { product: 'Mangues', quantity: 10, unitPrice: 500, total: 5000 }
  ];

  // Taxes et total
  taxRate: number = 18; // Taux de TVA en pourcentage
  get totalHT(): number {
    return this.orderItems.reduce((sum, item) => sum + item.total, 0);
  }
  get taxes(): number {
    return (this.totalHT * this.taxRate) / 100;
  }
  get totalTTC(): number {
    return this.totalHT + this.taxes;
  }

  // Fonction pour imprimer le bon de commande
  print(): void {
    window.print();
  }
}

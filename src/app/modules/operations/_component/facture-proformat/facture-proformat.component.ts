import { Component } from '@angular/core';

@Component({
  selector: 'app-facture-proformat',
  templateUrl: './facture-proformat.component.html',
  styleUrls: ['./facture-proformat.component.scss']
})
export class FactureProformatComponent {
  // Informations de la facture
  invoiceNumber: string = 'PF12345';
  invoiceDate: Date = new Date();
  dueDate: Date = new Date(new Date().setDate(new Date().getDate() + 7)); // Échéance à 7 jours

  // Informations sur l'entreprise
  companyName: string = 'Afrifish';
  companyAddress: string = '456 Rue des Poissons, Bamako, Mali';
  companyPhone: string = '+223 76 654 3210';
  companyEmail: string = 'contact@afrifish.com';

  // Informations sur le client
  clientName: string = 'Fatoumata Doumbia';
  clientAddress: string = '789 Rue des Mangues, Bamako, Mali';
  clientPhone: string = '+223 67 890 1234';
  clientEmail: string = 'fatoumata.doumbia@example.com';

  // Liste des articles sur la facture
  invoiceItems = [
    { product: 'Bar frais', quantity: 10, unitPrice: 1800, total: 18000 },
    { product: 'Tilapia congelé', quantity: 5, unitPrice: 1500, total: 7500 },
    { product: 'Papayes', quantity: 8, unitPrice: 700, total: 5600 }
  ];

  // Taxes et total
  taxRate: number = 18; // Taux de TVA
  get totalHT(): number {
    return this.invoiceItems.reduce((sum, item) => sum + item.total, 0);
  }
  get taxes(): number {
    return (this.totalHT * this.taxRate) / 100;
  }
  get totalTTC(): number {
    return this.totalHT + this.taxes;
  }

  // Fonction pour imprimer la facture proforma
  print(): void {
    window.print();
  }
}

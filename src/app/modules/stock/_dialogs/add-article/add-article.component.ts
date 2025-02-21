import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from '../../services/stock.service';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  created_by = localStorage.getItem('id_user');

  // Définition du formulaire
  Article = new FormGroup({
    id_categorie: new FormControl('', Validators.required), // Catégorie ajoutée
    reference: new FormControl('', [Validators.required, Validators.maxLength(75)]),
    designation: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    puInitial: new FormControl(null, [Validators.required, Validators.min(0)]),
    qteInitiale: new FormControl(0, [Validators.required, Validators.min(0)]),
    pvInitial: new FormControl(null, [Validators.required, Validators.min(0)]),
    datePeremption: new FormControl(null), // Champ optionnel
    descriptions: new FormControl('', [Validators.maxLength(250)]), // Champ optionnel
    table: new FormControl('article', Validators.required),
   // created_by: new FormControl(this.created_by, Validators.required), // Champ utilisateur créé
  });

  // Liste des catégories
  categories :any

  constructor(
    public dialogRef: MatDialogRef<AddArticleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private service: HomeService
  ) {}
  getCategory() {
    this.service.getall('categorie', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.categories = reponse;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

  ngOnInit(): void {
    // Pré-remplir les données si une modification est en cours
    if (this.data) {
      this.Article.patchValue(this.data);
    };
    this.getCategory()
  }

  saveDataArticle() {
    if (this.Article.valid) {
      this.dialogRef.close({
        event: 'insert',
        data: this.Article.value,
      });
    }
  }
}

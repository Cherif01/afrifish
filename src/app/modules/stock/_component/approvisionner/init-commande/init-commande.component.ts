import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-init-commande',
  templateUrl: './init-commande.component.html',
  styleUrls: ['./init-commande.component.scss']
})
export class InitCommandeComponent {
  id_entite =localStorage.getItem('id_entite');
  created_by =localStorage.getItem('id_user');
  InitCommande = new FormGroup({
    statut: new FormControl('en cours'),
    id_fournisseur: new FormControl(''),
    id_entite: new FormControl(this.id_entite,Validators.required),
    created_by: new FormControl(this.created_by,Validators.required),

  })
  id_fournisseur : any
  data: any;
  constructor(private router : Router, private activeroute : ActivatedRoute,private service : HomeService
  ){}
  ngOnInit(){
    (this.id_fournisseur = this.activeroute.snapshot.params['id'])
    console.log("id",this.id_fournisseur);

    this.InitCommande.patchValue({
      id_fournisseur: this.id_fournisseur
    });


  }

  saveInitCommande() {
    const formData = convertObjectInFormData(this.InitCommande.value);
    
    if (this.InitCommande.valid) {
      this.service.create('initCommande', 'create.php', formData).subscribe((response: any) => {
        if (response.status === 1) {
          const id_commande = response.id_commande; // Récupération de l'ID de la commande
          this.router.navigate(['/stock/panier-commande', id_commande]); // Redirection avec l'ID de la commande
        } else {
          console.error("Erreur lors de la création de la commande :", response.message);
        }
      });
    }
  }
   
}

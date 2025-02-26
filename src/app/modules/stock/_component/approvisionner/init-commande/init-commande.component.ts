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
  fournisseur_id : any
  data: any;
  constructor(private router : Router, private activeroute : ActivatedRoute,private service : HomeService
  ){}
  ngOnInit(){
    (this.fournisseur_id = this.activeroute.snapshot.params['id'])
    console.log("id",this.fournisseur_id);

    this.InitCommande.patchValue({
      id_fournisseur: this.fournisseur_id
    });


  }

  saveInitCommande(){
    const formData = convertObjectInFormData(this.InitCommande.value);
    if (this.InitCommande.valid) {
      console.log("formData", this.InitCommande.value);

      this.service.create('initCommande', 'create.php', formData).subscribe((data) => {
        this.data = data
        console.log("Id Fournisseur",this.fournisseur_id);

        this.router.navigate(['/stock/panier-commande',this.fournisseur_id])
      }
      )

    }
  }
}

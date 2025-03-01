import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { convertObjectInFormData } from 'src/app/app.component';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-init-vente',
  templateUrl: './init-vente.component.html',
  styleUrls: ['./init-vente.component.scss']
})
export class InitVenteComponent { id_entite =localStorage.getItem('id_entite');
  created_by =localStorage.getItem('id_user');
  InitVente = new FormGroup({
    statut: new FormControl('en cours'),
    id_client: new FormControl(''),
    id_entite: new FormControl(this.id_entite,Validators.required),
    created_by: new FormControl(this.created_by,Validators.required),

  })
  id_client : any
  data: any;
  constructor(private router : Router, private activeroute : ActivatedRoute,private service : HomeService
  ){}
  ngOnInit(){
    (this.id_client = this.activeroute.snapshot.params['id'])
    console.log("id",this.id_client);

    this.InitVente.patchValue({
      id_client: this.id_client
    });


  }

  saveInitVente() {
    const formData = convertObjectInFormData(this.InitVente.value);
  
    if (this.InitVente.valid) {
      this.service.create('initVente', 'create.php', formData).subscribe(
        (response: any) => {
          if (response.status === 1) {
            const id_vente = response.id_vente; // Récupération de l'ID de la vente
            this.router.navigate(['/operation/panier-vente', id_vente]); // Redirection avec l'ID de la vente
          } else {
            console.error("Erreur lors de la création de la vente :", response.message);
          }
        },
        (error) => {
          console.error("Erreur serveur :", error);
        }
      );
    }
  }
  
}

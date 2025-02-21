import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-init-commande',
  templateUrl: './init-commande.component.html',
  styleUrls: ['./init-commande.component.scss']
})
export class InitCommandeComponent {
  Init_achat = new FormGroup({
    statut: new FormControl('En cours'),
    id_fournisseur: new FormControl(''),

  })
  fournisseur_id : any
  data: any;
  constructor(private router : Router, private activeroute : ActivatedRoute,private service : HomeService
  ){}
  saveInitVente(){
    // const formData = convertObjectInFormData(this.Init_achat.value);
    // if (this.Init_achat.valid) {
    //   console.log("formData", this.Init_achat.value);

    //   this.service.create('initAchat', 'create.php', formData).subscribe((data) => {
    //     this.data = data
    //     console.log("Id Fournisseur",this.fournisseur_id);

    //     this.router.navigateByUrl(`/achat/panier_achat/${this.fournisseur_id}`)
    //     console.log("id_Init_Achat",this.fournisseur_id);

    //   }
    //   )

    // }
  }
}

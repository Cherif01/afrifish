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
  client_id : any
  data: any;
  constructor(private router : Router, private activeroute : ActivatedRoute,private service : HomeService
  ){}
  ngOnInit(){
    (this.client_id = this.activeroute.snapshot.params['id'])
    console.log("id",this.client_id);

    this.InitVente.patchValue({
      id_client: this.client_id
    });


  }

  saveInitVente(){
    const formData = convertObjectInFormData(this.InitVente.value);
    if (this.InitVente.valid) {
      console.log("formData", this.InitVente.value);

      this.service.create('initVente', 'create.php', formData).subscribe((data) => {
        this.data = data
        console.log("Id client",this.client_id);

        this.router.navigate(['/operation/panier-vente',this.client_id])
      }
      )

    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-init-vente',
  templateUrl: './init-vente.component.html',
  styleUrls: ['./init-vente.component.scss']
})
export class InitVenteComponent {
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

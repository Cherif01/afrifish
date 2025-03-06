import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-details-fournisseur',
  templateUrl: './details-fournisseur.component.html',
  styleUrls: ['./details-fournisseur.component.scss']
})
export class DetailsFournisseurComponent {
  title: string = 'Details Fournisseurs';
   constructor(
      private activeroute: ActivatedRoute,
      private service: HomeService,
      // private snackBar: MatSnackBar,
      // private dialog: MatDialog,
      // private router : Router
    ) {}
    id: any
ngOnInit(){
  (this.id = this.activeroute.snapshot.params['id']),
  this.getFournisseurById()
}
infoFournisseur: any
getFournisseurById(){
  this.service.getOne('fournisseur','getOne.php',this.id).subscribe({
    next: (reponse: any) => {
      this.infoFournisseur = reponse.fournisseur;
      console.log('Fournisseur : ', this.infoFournisseur);
    } ,
    error: (err: any) => {
      console.log('REPONSE ERROR : ', err);
    },
  })
}
listeApprovisionnements: any[] = [];
getApprovisionnements() {
  this.service.getOne('approvisionnements', 'getByFournisseur.php', this.id).subscribe({
    next: (response: any) => {
      this.listeApprovisionnements = response.approvisionnements;
    },
    error: (err: any) => {
      console.log('Erreur : ', err);
    }
  });
}

}

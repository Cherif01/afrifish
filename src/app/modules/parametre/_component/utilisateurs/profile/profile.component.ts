import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    
    private authService: AuthserviceService
  ) {}
  ngOnInit() {
    this.getUserConnect();
   
  }
  InfoUser: any = [];
  id_user = localStorage.getItem('id_user');
  getUserConnect() {
    this.authService
      .getClauseID('utilisateur', 'getOne.php', this.id_user)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.InfoUser = response;
        },
        error: (error: any) => {
          console.log('Error : ', error);
        },
      });
  }
}

import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private authService: AuthserviceService,
  ) {}

  logout() {
    this.authService.clearToken();
  }

  ngOnInit() {
    this.getUserConnect();
  }

  // InofUser
  InfoUser: any = [];
  id_user = localStorage.getItem('id_user');
  getUserConnect() {
    this.authService
      .getClauseID('utilisateurs', 'getOne.php', this.id_user)
      .subscribe({
        next: (response: any) => {
          // console.log(response);
          this.InfoUser = response;
        },
        error: (error: any) => {
          console.log('REPONSE ERROR : ', error);
        },
      });
  }
}

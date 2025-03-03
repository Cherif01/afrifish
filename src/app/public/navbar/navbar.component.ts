import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';
import { HomeService } from 'src/app/modules/accueil/services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  unreadCount: number = 0;

  constructor(
    public Location: Location,
    private authService: AuthserviceService,
    private service: HomeService
  ) {}

  logout() {
     this.authService.clearToken();
  }

  ngOnInit() {
    this.getUserConnect();
    this.getSalutation();
    this.getSalutationMessage();
    this.loadNotifications();
    setInterval(() => {
      this.loadNotifications();
    }, 10000);
  }

  getSalutation(): string {
    const currentHour = new Date().getHours(); // Obtenir l'heure actuelle (0-23)

    if (currentHour < 12) {
      return 'Bonjour';
    } else if (currentHour < 18) {
      return 'Bon après-midi';
    } else {
      return 'Bonsoir';
    }
  }

  getSalutationMessage(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Passez une excellente matinée !';
    } else if (currentHour < 18) {
      return 'Profitez de votre après-midi !';
    } else {
      return 'Passez une agréable soirée !';
    }
  }

  // InofUser
  InfoUser: any = [];
  id_user = localStorage.getItem('id_user');
  id_utilisateur = localStorage.getItem('id_user');
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
  notifications: any[] = [];


loadNotifications() {
  this.service.getone('notification', 'getNotif.php', this.id_utilisateur).subscribe({
    next: (response: any) => {
      console.log('Notifications:', response);
      this.notifications = response;
    },
    error: (error: any) => {
      console.log('Erreur lors du chargement des notifications:', error);
    }
  });
}

}




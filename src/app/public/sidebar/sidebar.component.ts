import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  InfoUser: any = {};
  id_user = localStorage.getItem('id_user');
  privilege: string = '';
  entite: string = '';

  // menus: any[] = [
  //   { name: 'Tableau de bord', link: '/home/home', icon: 'dashboard', allowedFor: ['admin', '', 'employe'] },
  //   { name: 'Liste des entités', link: '/home/entite', icon: 'flag', allowedFor: ['admin'] },

  //   { name: 'Fournisseurs', link: '/contact/list-fournisseur', icon: 'person', allowedFor: ['admin', '', 'employe'] },
  //   { name: 'Clients', link: '/contact/list-client', icon: 'person', allowedFor: ['admin', '', 'employe'] },

  //   { name: 'Inventaire', link: '/stock/list-article', icon: 'dashboard', allowedFor: ['admin', '', 'employe'] },
  //   { name: 'Catégorie', link: '/stock/list-category', icon: 'flag', allowedFor: ['admin', '', 'employe'] },
  //   { name: 'Approvisionner', link: '/stock/list-aprovisionnement', icon: 'dashboard', allowedFor: ['admin', '', 'employe'] },
  //   { name: 'Analyse', link: '/stock/list-', icon: 'dashboard', allowedFor: ['admin', '', 'employe'] },

  //   { name: 'Bon de commande', link: '/operation/bon-commande', icon: 'send', allowedFor: ['admin', 'fournisseur'] },
  //   { name: 'Pro-Forma', link: '/operation/pro-format', icon: 'folder', allowedFor: ['admin', '', 'employe'] },
  //   { name: 'Ventes', link: '/operation/list-vente', icon: 'money_off', allowedFor: ['admin', '', 'employe'] },

  //   { name: 'Caisse', link: '/comptabilite/caisse', icon: 'account_balance', allowedFor: ['admin'] },
  //   { name: 'Historique', link: '/comptabilite/historique', icon: 'history', allowedFor: ['admin'] },

  //   { name: 'Utilisateurs', link: '/parametre/list-user', icon: 'group', allowedFor: ['admin'] },
  //   { name: 'Accès', link: '/parametre/list-acces', icon: 'lock', allowedFor: ['admin'] },
  //   { name: 'Affectation', link: '/parametre/list-affectation', icon: 'settings_accessibility', allowedFor: ['admin'] },
  //   { name: 'Configuration', link: '/parametre/home4', icon: 'settings', allowedFor: ['admin'] },
  // ];

  constructor(private authService: AuthserviceService) {}

  ngOnInit() {
    this.getUserConnect();
  }

  getUserConnect() {
    this.authService.getClauseID('utilisateur', 'getOne.php', this.id_user).subscribe({
      next: (response: any) => {
        this.InfoUser = response;
        this.privilege = response.privilege;
      },
      error: (error: any) => {
        console.log('Erreur : ', error);
      },
    });
  }

  logout() {
    this.authService.clearToken();
  }



}

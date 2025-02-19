import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDeleteComponent } from './public/default-delete/default-delete.component';
import { FooterComponent } from './public/footer/footer.component';
import { NavbarComponent } from './public/navbar/navbar.component';
import { NotfoundComponent } from './public/notfound/notfound.component';
import { SidebarComponent } from './public/sidebar/sidebar.component';
import { DemoMaterialModule } from './demo-material-module';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app.routing';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './modules/accueil/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DefaultDeleteComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRouting, {}),
    ToastrModule.forRoot({
      // Configuration de base de ngx-toastr
      timeOut: 3000, // Durée d'affichage (en ms)
      positionClass: 'toast-top-right', // Position par défaut des toasts
      preventDuplicates: true, // Évite les toasts en double
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  // exports: [ToastrModule],
})
export class AppModule { }

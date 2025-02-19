import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRouting } from './home.routing';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { EntiteComponent } from './components/entite/entite.component';



@NgModule({
  declarations: [
    EntiteComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(homeRouting)
  ]
})
export class HomeModule { }

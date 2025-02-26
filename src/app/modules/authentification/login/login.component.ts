import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { convertObjectInFormData } from 'src/app/app.component';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    telephone: ['', Validators.required],
    mot_de_passe: ['', Validators.required],
  });

  constructor(
    private loginService: AuthserviceService,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    // console.log(this.loginForm.value);
    const formData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loginService
        .login(
          'authentification',
          'login.php',
          convertObjectInFormData(this.loginForm.value)
        )
        .subscribe({
          next: (response: any) => {
            // console.log('Response : ', response);
            this.loginService.saveToken(
              response.access_token,
              response.idUser,
              response.idEntite,
              response.privilege
            );
          },
          error: (error: any) => {
            console.log('ERROR : ', error);
          },
        });
    } else {
      console.log("Aucune requete pour l'instant...");
    }
  }
}

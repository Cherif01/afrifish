import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { convertObjectInFormData } from 'src/app/app.component';
import { AuthserviceService } from 'src/app/core/guards/services/authservice.service';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup<{ [key: string]: AbstractControl<any, any> }>({
    telephone: new FormControl('', Validators.required),
    mot_de_passe: new FormControl('', Validators.required),
  });

  isFournisseurMode: boolean = false;

  toggleFournisseurMode(isChecked: boolean) {
    this.isFournisseurMode = isChecked;

    if (this.isFournisseurMode) {
      // Supprime le champ mot de passe
      this.loginForm.removeControl('mot_de_passe');
    } else {
      // Ajoute le champ mot de passe s'il n'existe pas déjà
      if (!this.loginForm.controls['mot_de_passe']) {
        this.loginForm.addControl('mot_de_passe', new FormControl('', Validators.required));
      }
    }
  }



  videoElement!: HTMLVideoElement;
  isFaceRecognitionRequired = false;
  userId: string = ''; // ID de l'utilisateur après authentification des identifiants

  constructor(
    private loginService: AuthserviceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadFaceApiModels();
  }

  async loadFaceApiModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value; // Récupère les valeurs du formulaire

      let loginData = new FormData();
      let endpoint;

      if (this.isFournisseurMode) {
        // Connexion fournisseur : envoie uniquement le numéro de téléphone
        const telephone = formValues['telephone'] ?? '';
        loginData.append('telephone', telephone);
        endpoint = 'login_fournisseur.php';
      } else {
        // Connexion normale avec mot de passe
        loginData = convertObjectInFormData(formValues);
        endpoint = 'login.php';
      }

      this.loginService.login('authentification', endpoint, loginData).subscribe({
        next: (response: any) => {
          if (response.statut === 1) {
            this.userId = response.idUser;

            if (response.require_face_recognition) {
              this.isFaceRecognitionRequired = true;
              this.startFaceRecognition();
            } else {
              this.saveUserSession(response);
            }
          } else {
            console.log('Erreur : ', response.message);
          }
        },
        error: (error: any) => {
          console.log('ERROR : ', error);
        },
      });
    } else {
      console.log("Aucune requête envoyée...");
    }
  }



  async startFaceRecognition() {
    this.videoElement = document.createElement('video');
    this.videoElement.width = 320;
    this.videoElement.height = 240;
    document.body.appendChild(this.videoElement);

    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    this.videoElement.srcObject = stream;
    this.videoElement.play();

    setTimeout(async () => {
      const detection = await faceapi.detectSingleFace(this.videoElement, new faceapi.TinyFaceDetectorOptions());
      if (detection) {
        this.sendFaceVerification();
      } else {
        console.log('Aucun visage détecté !');
      }
    }, 3000);
  }

  sendFaceVerification() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.width;
    canvas.height = this.videoElement.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    this.loginService
      .verifyFace('authentification', 'face_verification.php', {
        userId: this.userId,
        image: imageData,
      })
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.saveUserSession(response);
          } else {
            console.log('Reconnaissance faciale échouée.');
          }
        },
        error: (error: any) => {
          console.log('Erreur de reconnaissance faciale : ', error);
        },
      });
  }

  saveUserSession(response: any) {
    this.loginService.saveToken(
      response.access_token,
      response.idUser,
      response.idEntite,
      response.privilege
    );
    console.log('Connexion réussie !');
  }
}

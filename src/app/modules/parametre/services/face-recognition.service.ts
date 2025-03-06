import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {
  private modelLoaded = false;

  async loadModels() {
    if (!this.modelLoaded) {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');
      this.modelLoaded = true;
    }
  }

  async captureFace(videoElement: HTMLVideoElement): Promise<string | null> {
    const detection = await faceapi.detectSingleFace(videoElement).withFaceLandmarks().withFaceDescriptor();
    if (detection) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  }
}

import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';

export class FirebaseClient {
  // for development
  static async fetchIdTokenOfDevUser() {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Only available in development environment');
    }

    const httpService = new HttpService();
    const configService = new ConfigService();

    const devUserUid = await configService.get('FIREBASE_DEV_USER_UID');
    const customToken = await admin.auth().createCustomToken(devUserUid);

    const firebaseWebApiKey = await configService.get('FIREBASE_WEB_API_KEY');
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseWebApiKey}`;
    const data = `{"token": "${customToken}","returnSecureToken":true}`;
    const headers = { 'Content-Type': 'application/json' };

    const result = await httpService.post(url, data, { headers }).toPromise();
    return result.data.idToken;
  }
}

// src/firestore.service.ts

import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import firebase from '/Users/alexanderjacobsen/Medoc/medoc-api/firebase';
import * as serviceAccount from '/Users/alexanderjacobsen/Medoc/medoc-api/src/config/secrets/medoc-ec348-3077f113c92d.json';

@Injectable()
export class FirestoreService {
  private static firebaseApp: admin.app.App;

  constructor() {
    if (!FirestoreService.firebaseApp) {
      FirestoreService.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
      });
    }
  }

  get firestore(): FirebaseFirestore.Firestore {
    return FirestoreService.firebaseApp.firestore();
  }
}

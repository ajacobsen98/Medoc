// src/firestore.service.ts

import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as path from 'path';


@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;

  constructor() {
    // Use the Firebase Admin SDK to set up the connection
    const serviceAccountPath = path.join(__dirname, '..', 'secrets', 'medoc-ec348-firebase-adminsdk-inov3-e94c848076.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });

    this.firestore = admin.firestore();
  }

  getDb(): admin.firestore.Firestore {
    return this.firestore;
  }
}

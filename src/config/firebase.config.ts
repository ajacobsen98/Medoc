import * as admin from 'firebase-admin';
import { FirestoreService } from '../firestore.service';


const firestoreService = new FirestoreService();
export const firestore = firestoreService.firestore;

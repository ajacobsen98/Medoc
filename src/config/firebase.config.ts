import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, '..', 'secrets', 'medoc-ec348-firebase-adminsdk-inov3-e94c848076.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.firestore();

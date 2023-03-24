import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(__dirname, 'config', 'secrets', 'medoc-ec348-3077f113c92d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export default admin;

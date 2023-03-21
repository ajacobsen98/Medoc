import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { firestore } from '../config/firebase.config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private usersCollection = firestore.collection('users');

  async createUser(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = {
      ...user,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userRef = await this.usersCollection.add(newUser);
    newUser.id = userRef.id;

    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    const userRef = this.usersCollection.doc(id);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data() as User;
      return {
        id: userDoc.id,
        ...userData,
      };
    } else {
      return null;
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userRef = this.usersCollection.doc(id);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      await userRef.update({ ...updates, updatedAt: new Date() });
      const updatedUserDoc = await userRef.get();
      const updatedUserData = updatedUserDoc.data() as User;
      return {
        id: updatedUserDoc.id,
        ...updatedUserData,
      };
    } else {
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const userRef = this.usersCollection.doc(id);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      await userRef.delete();
      return true;
    } else {
      return false;
    }
  }
  async findUserByUsername(username: string): Promise<User | null> {
    const querySnapshot = await this.usersCollection.where('username', '==', username).get();
  
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as User;
      return {
        id: userDoc.id,
        ...userData,
      };
    } else {
      return null;
    }
  }
  
}

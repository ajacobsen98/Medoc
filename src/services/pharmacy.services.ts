import { Injectable } from '@nestjs/common';
import { Pharmacy } from '../models/pharmacy.model';
import { firestore } from '../config/firebase.config';

@Injectable()
export class PharmacyService {
  private readonly pharmacyCollection = firestore.collection('pharmacies');

  async createPharmacy(pharmacy: Pharmacy): Promise<Pharmacy> {
    const pharmacyRef = await this.pharmacyCollection.add(pharmacy);
    const pharmacySnapshot = await pharmacyRef.get();
    const data = pharmacySnapshot.data();
    return {
      id: pharmacySnapshot.id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      user: data.user,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Pharmacy;
  }

  async getPharmacyById(id: string): Promise<Pharmacy> {
    const pharmacySnapshot = await this.pharmacyCollection.doc(id).get();
    if (pharmacySnapshot.exists) {
      const data = pharmacySnapshot.data();
      return {
        id: pharmacySnapshot.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        user: data.user,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Pharmacy;
    }
    return null;
  }

  async updatePharmacy(id: string, updatedPharmacy: Partial<Pharmacy>): Promise<Pharmacy> {
    await this.pharmacyCollection.doc(id).update(updatedPharmacy);
    const pharmacySnapshot = await this.pharmacyCollection.doc(id).get();
    const data = pharmacySnapshot.data();
    return {
      id: pharmacySnapshot.id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      user: data.user,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Pharmacy;
  }

  async deletePharmacy(id: string): Promise<boolean> {
    try {
      await this.pharmacyCollection.doc(id).delete();
      return true;
    } catch (error) {
      // Handle the error appropriately, e.g., log it
      return false;
    }
  }
}
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PharmacyService } from '../services/pharmacy.services';
import { Pharmacy } from '../models/pharmacy.model';
import { CreatePharmacyInput } from '../dto/create-pharmacy.input';
import { UpdatePharmacyInput } from '../dto/update-pharmacy.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Pharmacy)
export class PharmacyResolver {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @UseGuards(GqlAuthGuard)

  @Query(() => Pharmacy, { nullable: true })
  async pharmacy(@Args('id') id: string): Promise<Pharmacy | null> {
    return this.pharmacyService.getPharmacyById(id);
  }

  @Mutation(() => Pharmacy)
  async createPharmacy(@Args('input') input: Pharmacy): Promise<Pharmacy> {
    return this.pharmacyService.createPharmacy(input);
  }

  @Mutation(() => Pharmacy, { nullable: true })
  async updatePharmacy(@Args('id') id: string, @Args('input') input: UpdatePharmacyInput): Promise<Pharmacy | null> {
    return this.pharmacyService.updatePharmacy(id, input);
  }

  @Mutation(() => Boolean)
  async deletePharmacy(@Args('id') id: string): Promise<boolean> {
    return this.pharmacyService.deletePharmacy(id);
  }
}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductVariantService } from '../services/product-variant.services';
import { ProductVariant } from '../models/product-variant.model';
import { CreateProductVariantInput } from '../dto/create-product-variant.input';
import { UpdateProductVariantInput } from '../dto/update-product-variant.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => ProductVariant)
export class ProductVariantResolver {
  constructor(private readonly productVariantService: ProductVariantService) {}
  
  @UseGuards(GqlAuthGuard)

  @Query(() => ProductVariant, { nullable: true })
  async productVariant(@Args('id') id: string): Promise<ProductVariant | null> {
    return this.productVariantService.getProductVariantById(id);
  }

  @Mutation(() => ProductVariant)
  async createProductVariant(@Args('input') input: ProductVariant): Promise<ProductVariant> {
    return this.productVariantService.createProductVariant(input);
  }

  @Mutation(() => ProductVariant, { nullable: true })
  async updateProductVariant(@Args('id') id: string, @Args('input') input: UpdateProductVariantInput): Promise<ProductVariant | null> {
    return this.productVariantService.updateProductVariant(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProductVariant(@Args('id') id: string): Promise<boolean> {
    return this.productVariantService.deleteProductVariant(id);
  }
}

export { ProductVariantService };

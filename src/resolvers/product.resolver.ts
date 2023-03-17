import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductService } from '../services/product.services';
import { Product } from '../models/product.model';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}
  
  @UseGuards(GqlAuthGuard)
  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: string): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Mutation(() => Product)
  async createProduct(@Args('input') input: Product): Promise<Product> {
    return this.productService.createProduct(input);
  }

  @Mutation(() => Product, { nullable: true })
  async updateProduct(@Args('id') id: string, @Args('input') input: UpdateProductInput): Promise<Product | null> {
    return this.productService.updateProduct(id, input);
  }
}

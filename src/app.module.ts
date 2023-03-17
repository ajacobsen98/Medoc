import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsResolver } from './posts.resolver';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreService } from './firestore.service';
import { User } from './models/user.model';
import { Pharmacy } from './models/pharmacy.model';
import { Product } from './models/product.model';
import { Inventory } from './models/inventory.model';
import { Order } from './models/order.model';
import { ProductVariant } from './models/product-variant.model';
import { PharmacyResolver } from './resolvers/pharmacy.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { InventoryResolver } from './resolvers/inventory.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { ProductVariantResolver } from './resolvers/product-variant.resolver';
import { PharmacyService } from './services/pharmacy.services';
import { UserService } from './services/user.services';
import { ProductService } from './services/product.services';
import { InventoryService } from './services/inventory.services';
import { OrderService } from './services/order.services';
import { ProductVariantService } from './services/product-variant.services';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';







@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '18h' },
    }),
    
    PassportModule.register({ defaultStrategy: 'local' }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      types: [User, Pharmacy, Product, Inventory, Order, ProductVariant], 

    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PostsResolver,
    FirestoreService,
    AuthService,
    LocalStrategy,
    PassportModule,
    PharmacyResolver,
    UserResolver,
    ProductResolver,
    InventoryResolver,
    OrderResolver,
    ProductVariantResolver,
    PharmacyService,
    UserService,
    ProductService,
    InventoryService,
    OrderService,
    ProductVariantService],
})
export class AppModule {}


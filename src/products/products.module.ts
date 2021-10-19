import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';

// Mongoose module crea el modelo y lo hace disponible para inyectar en las diferentes entidades que lo requieran
// si existe más de un modelo, se añade de la misma forma en el arreglo parámetro de forFeature
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

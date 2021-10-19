import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getProducts();
    return products;
  }
  // @Body parsea el body del request y busca las propiedades cuyo nombre especificamos como parámetros
  // asignándolos a las variables correspondientes
  @Post()
  async createProduct(
    @Body('name') prodName: string,
    @Body('description') prodDescript: string,
    @Body('price') prodPrice: number,
  ): Promise<any> {
    const generatedPId = await this.productsService.addProduct(
      prodName,
      prodDescript,
      prodPrice,
    );

    return { id: generatedPId };
  }

  @Get(':id')
  getProduct(@Param('id') paramId: string) {
    return this.productsService.getOneProduct(paramId);
  }

  @Patch(':id')
  async editProduct(
    @Param('id') paramId: string,
    @Body('name') prodName: string,
    @Body('description') prodDescript: string,
    @Body('price') prodPrice: number,
  ) {
    return await this.productsService.editProduct(
      paramId,
      prodName,
      prodDescript,
      prodPrice,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}

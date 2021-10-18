import { Controller, Get, Post, Body } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }
  // @Body parsea el body del request y busca las propiedades cuyo nombre especificamos como parámetros
  // asignándolos a las variables correspondientes
  @Post()
  createProduct(
    @Body('name') prodName: string,
    @Body('description') prodDescript: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedPId = this.productsService.addProduct(
      prodName,
      prodDescript,
      prodPrice,
    );
    return { id: generatedPId };
  }
}

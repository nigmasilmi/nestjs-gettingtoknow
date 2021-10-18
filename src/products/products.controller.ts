import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Get(':id')
  getProduct(@Param('id') paramId: string) {
    return this.productsService.getOneProduct(paramId);
  }

  @Patch(':id')
  editProduct(
    @Param('id') paramId: string,
    @Body('name') prodName: string,
    @Body('description') prodDescript: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.editProduct(
      paramId,
      prodName,
      prodDescript,
      prodPrice,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}

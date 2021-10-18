import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, desc: string, price: number) {
    const randomId = String(Math.random());
    const newProduct = new Product(randomId, title, desc, price);
    this.products.push(newProduct);
    return randomId;
  }

  getProducts(): Product[] {
    // dado que estamos resguardando products (private), retornar el mismo objeto reference type
    // implicaría un acceso directo a esta entidad, por lo que para mantener su integridad, retornamos una copia de esta
    return [...this.products];
  }
}

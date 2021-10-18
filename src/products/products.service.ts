import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(paramId: string): [Product, number] {
    const targetIndex = this.products.findIndex((p) => p.id === paramId);
    const targetProduct = this.products[targetIndex];

    if (!targetProduct) {
      throw new NotFoundException('Producto no encontrado');
    }
    return [targetProduct, targetIndex];
  }

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

  getOneProduct(paramId: string): Product {
    return this.findProduct(paramId)[0];
  }

  editProduct(id: string, title: string, desc: string, price: number): Product {
    const [targetProduct, targetIndex] = this.findProduct(id);
    let temporalP = { ...targetProduct };
    if (title) {
      temporalP.name = title;
    }
    if (desc) {
      temporalP.description = desc;
    }
    if (price) {
      temporalP.price = price;
    }
    this.products[targetIndex] = temporalP;
    return temporalP;
  }

  deleteProduct(id: string) {
    const [targetProduct, targetIndex] = this.findProduct(id);
    this.products.splice(targetIndex, 1);
    return targetProduct.id;
  }
}

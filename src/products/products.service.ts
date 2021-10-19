import { Injectable, NotFoundException } from '@nestjs/common';
// import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  // dado que Model es un tipo genérico, se debe especificar la forma del modelo
  // con el uso de una interfaz
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findProduct(paramId: string): Promise<Product> {
    let product;
    // en caso de que un id no sea de la forma mongoDB id, se genera un error 500
    // para salvar ese error, incluímos el código de interés en un try catch
    try {
      product = await this.productModel.findById(paramId);
    } catch {
      throw new NotFoundException('Error en el código del producto');
    }
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async addProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      name: title,
      description: desc,
      price,
    });
    const newP = await newProduct.save();
    return newP.id as string;
  }

  async getProducts() {
    // dado que las queries en mongoose retornan un thenable, para retornar una promesa real se ejecuta el método exec()
    const products = await this.productModel.find().exec();
    // recordar que .id es un getter, no hace referencia a la propiedad como tal, sino es un getter de la propiedad _id
    return products;
  }

  async getOneProduct(paramId: string): Promise<any> {
    const product = await this.findProduct(paramId);
    return product;
  }

  async editProduct(
    id: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<Product> {
    const product = await this.findProduct(id);
    if (title) {
      product.name = title;
    }
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    product.save();
    return product;
  }

  async deleteProduct(id: string) {
    const isItGone = await this.productModel.deleteOne({ _id: id }).exec();
    if (isItGone.deletedCount === 0) {
      throw new NotFoundException('No se ha podido eliminar el producto');
    }
  }
}

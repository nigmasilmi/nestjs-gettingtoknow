import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export class Product {
  // id: string;
  // name: string;
  // description: string;
  // price: number;
  // constructor(id: string, name: string, descrip: string, price: number) {
  //   this.id = id;
  //   this.name = name;
  //   this.description = descrip;
  //   this.price = price;
  // }
  // con el siguiente método, agregando un accessor a los parámetros, se crearán iguales propiedades en la clase
  // feature propio de TypeScript
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
  ) {}
}

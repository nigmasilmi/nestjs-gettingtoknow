import * as mongoose from 'mongoose';
// otorgamos las propiedades de mongoose Document a la interfaz de producto para evitar errores de tipo en el manejo de la data
// proveniente de las consultas a la base de datos, esto se hace notable al ejecutar el método save() sobre un objeto
// que no es de la forma Mongoose
export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}

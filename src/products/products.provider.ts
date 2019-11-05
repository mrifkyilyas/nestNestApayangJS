import { Connection } from 'mongoose';
import { ProductsSchema } from './schemas/products.schema';

export const productsProviders = [
  {
    provide: 'PRODUCTS_MODEL',
    useFactory: (connection: Connection) => connection.model('Product', ProductsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
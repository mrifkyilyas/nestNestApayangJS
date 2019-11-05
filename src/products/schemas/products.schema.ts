// import * as mongoose from 'mongoose';
// const Schema = mongoose.Schema
// const Products = new Schema({
//     name: {
//         type: String,
//         required: [true, 'name is required']
//     },
//     quantity: {
//         type: Number,
//         required: [true, 'quantity is required']
//     },
//     description: {
//         type: String,
//     },
//     price: {
//         type: Number,
//         required: [true, 'price is required']
//     },
// });

// export const ProductsSchema = mongoose.model('Product', Products)


import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  description: String,
  price: Number,
});


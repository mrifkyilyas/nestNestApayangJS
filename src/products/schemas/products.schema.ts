import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const ProductsSchema = new Schema({
  name: String,
  quantity: Number,
  description: String,
  price: Number,
  owner: {
    type: Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Cats', 'Dogs']
  }

});


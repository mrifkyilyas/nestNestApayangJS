import * as mongoose from 'mongoose';

export const usersSchema = new mongoose.Schema({
  name: String,
  password: String,
  role: String,
});

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const TransactionSchema = new Schema({
    amount: {
        type: Number,
        min: [10000, 'Minimal amount 10000'],
        require: [true, 'amount is required']
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        require: [true, 'Destination account must fill']
    }

});


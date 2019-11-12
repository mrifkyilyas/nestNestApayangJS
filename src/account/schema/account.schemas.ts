import * as mongoose from 'mongoose'
export const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String
    },
    balance: {
        type: Number,
        default: 50000,
        min: [20000, 'Minimal Balance 20000']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Cats', 'Dogs']
    }
})



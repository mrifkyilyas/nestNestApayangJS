import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { catsSchema } from '../../cats/schemas/cats.schemas'
export const dogsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        validate: [
            {
                validator: async function unique() {
                    try {
                        let foundCats = mongoose.model('Cats', catsSchema).findOne({ userName: this.userName })
                        let foundDogs = mongoose.model('Dogs', dogsSchema).findOne({ userName: this.userName })
                        let [foundCat, foundDog] = await Promise.all([foundCats, foundDogs])
                        if ((foundCat && foundCat._id !== this._id) || (foundDog && foundDog._id !== this._id)) {
                            return false
                        } else {
                            return true
                        }
                    } catch (error) {
                        throw error
                    }
                },
                message: "username telah digunakan"
            }

        ]
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    name: {
        type: String,
        required: [true, 'password required']
    },
    color: String,
    age: Number,
    health: Boolean
})

dogsSchema.pre('save', function (next) {
    let temp = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    this.password = temp
    next()
})

dogsSchema.pre('insertMany', function (next) {
    // let temp = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    // this.password = temp
    console.log('masuk middleware insert many',this)
    next()
})





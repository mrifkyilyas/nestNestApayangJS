import { Model } from 'mongoose';
import { Injectable, Inject } from "@nestjs/common";
import { Products } from './interfaces/products.inteface'
import { Users } from '../users/interfaces/users.interface'
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductsDto, EditProductsDto } from './dto/create-products.dto'
import { userLogin } from '../common/isLogin.decorator'
import { Cats } from '../cats/interfaces/cats.interfaces';
import { Dogs } from '../dogs/interfaces/dogs.interfaces';



@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCTS_MODEL') private readonly productsModel: Model<Products>,
        @Inject('USERS_MODEL') private readonly usersModel: Model<Users>,
        @Inject('CATS_MODEL') private readonly catsModel: Model<Cats>,
        @Inject('DOGS_MODEL') private readonly dogsModel: Model<Dogs>
    ) { }

    async findAll(): Promise<any> {
        return await this.productsModel.find()
            .populate('owner', this.dogsModel)
            .populate('owner', this.catsModel)
    }

    async create(createProductsDto: CreateProductsDto, userLogin: any): Promise<Products> {
        console.log(createProductsDto, 'ini product di service')
        console.log(userLogin, 'ini userLogin')
        const { id, type } = userLogin
        const { quantity, name, price, description } = createProductsDto
        const newProducts = await this.productsModel.create({
            owner: id,
            quantity,
            name,
            price,
            description,
            onModel: type
        })

        return newProducts
    }

    // async update(updateProductsDto: EditProductsDto, id: string):Promise<Products> {
    //     return 

    // }

    async updateProduct(productId, updateProductsDto: EditProductsDto): Promise<Products> {
        console.log(productId, 'ini product id')
        const editedProducts = await this.productsModel
            .findByIdAndUpdate({ _id: productId.id }, updateProductsDto, { new: true });
        return editedProducts
    }

    async findProducts(id: string): Promise<any> {
        return await this.productsModel.findById(id).populate('userId', this.usersModel)
    }

    async aggregationGet(): Promise<any> {
        let agg = this.productsModel.aggregate([
            {
                $lookup: {
                    from: "cats",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerCats"
                },
            },
            {
                $lookup: {
                    from: "dogs",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDogs"
                },
            },

            {
                $addFields: {
                    owner:
                        { "$setUnion": ["$ownerDogs", "$ownerCats"] },
                }
            },
            {
                $group:
                {
                    _id: {
                        owner: "$owner",
                        type: "$onModel",
                        name: { $arrayElemAt: ["$owner.name", 0] },
                    },
                    products: {
                        $push: {
                            _id: "$_id", 
                            name: "$name", 
                            price: "$price", 
                            quality: "$quality",
                            description: "$description"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, type: '$_id.type', name: '$_id.name', products: "$products"
                }
            }
        ])
        return agg


        // let agg = this.catsModel.aggregate([{
        //     $lookup: {
        //         from: "products",
        //         localField: "_id",
        //         foreignField: "owner",
        //         as: "products"
        //     },
        // }, {
        //     $addFields: {
        //         type: "$products.onModel"
        //     }
        // },])

        // let agg2 = this.dogsModel.aggregate([{
        //     $lookup: {
        //         from: "products",
        //         localField: "_id",
        //         foreignField: "owner",
        //         as: "products"
        //     },
        // }, {
        //     $addFields: {
        //         type: "$onModel.products"
        //     }
        // },])
        // let [dog, cat] = await Promise.all([agg, agg2])

        // return dog.concat(cat)
    }
}

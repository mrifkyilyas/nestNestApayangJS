import { Model } from 'mongoose';
import { Injectable,Inject } from "@nestjs/common";
import { Products } from './interfaces/products.inteface'
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductsDto } from './dto/create-products.dto'



@Injectable()
export class ProductService {
    constructor(@Inject('PRODUCTS_MODEL') private readonly productsModel: Model<Products>) { }
    findAll(): string {
        return 'Hello product !';
    }

    async create(createProductsDto: CreateProductsDto): Promise<Products> {
        const newProducts = await new this.productsModel(createProductsDto)
        return newProducts.save()
    }
}
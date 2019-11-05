import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './products.services'
import { CreateProductsDto } from './dto/create-products.dto'
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }
    @Get()
    findAll(): string {
        return this.productService.findAll()
    }

    @Post()
    create(@Body() createProductsDto: CreateProductsDto) {
        return this.productService.create(createProductsDto)
    }

}
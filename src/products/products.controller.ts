import { UseInterceptors, Param, Inject, forwardRef, UsePipes, Headers, UseGuards, Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, Header, Put, Delete } from '@nestjs/common';
import { ProductService } from './products.services'
import { CreateProductsDto, EditProductsDto } from './dto/create-products.dto'
import { HttpExceptionFilter } from '../common/http-exception.filter'
import { JoiValidationPipe } from '../common/joi-validation.pipe'
import { Roles } from '../common/roles.decorator'
import { RolesGuard } from '../common/roles.guard'
import { AutorizeProductGuard } from '../common/autorize.products.guard'
import { LoggingInterceptor } from '../common/logging.inteception'
import { userLogin } from '../common/isLogin.decorator'
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
// @UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
// @UsePipes(ValidationPipe)
export class ProductsController {
    constructor(private readonly productService: ProductService) { }
    @Get()
    findAll(@userLogin() user: any): any {
        return this.productService.findAll()
    }

    // @Get('verify')
    // async getUser(@Headers() headers: any) {
    //     console.log(headers);
    //     return ''
    // }

    // @Get('interception')
    // async findOne(@isLogin('firstName') firstName: string) {
    //     console.log(`Hello ${firstName}`);
    // }

    @Post()
    create(@Body() createProductsDto: CreateProductsDto, @userLogin() user: any): any {
        console.log(createProductsDto, 'ini product di controller')
        return this.productService.create(createProductsDto, user)
    }

    @Get('agg')
    GetAggreagation(): any {
        return this.productService.aggregationGet()
    }

    @Delete()
    deleteAll(): any {
        return this.productService.deleteAll()
    }

    @Delete(':id')
    deleteById(@Param() idProduct: string): any {
        return this.productService.deleteById(idProduct)
    }


    // @Put(':id')
    // @UseGuards(AutorizeProductGuard)
    // update(@Body() editProductDto: EditProductsDto, @Param() postId: string): any {
    //     return this.productService.updateProduct(postId, editProductDto)
    // }

    // @Get(':id')
    // getOneProduct(@Param() id: string): any {
    //     return id
    // }


    // @Get('error')
    // error(): any {
    //     throw new HttpException('Not_Found', HttpStatus.NOT_FOUND);
    // }

    // @Get('error-custom')
    // errorCustom(): any {
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'ini adalah error custom',
    //     }, 403);
    // }

}
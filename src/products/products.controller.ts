import { UseInterceptors, Inject, forwardRef, UsePipes, Headers, UseGuards, Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, Header } from '@nestjs/common';
import { ProductService } from './products.services'
import { CreateProductsDto } from './dto/create-products.dto'
import { HttpExceptionFilter } from '../common/http-exception.filter'
import { JoiValidationPipe } from '../common/joi-validation.pipe'
import { Roles } from '../common/roles.decorator'
import { RolesGuard } from '../common/roles.guard'
import { LoggingInterceptor } from '../common/logging.inteception'
import { isLogin } from '../common/isLogin.decorator'

@Controller('products')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
// @UsePipes(ValidationPipe)
export class ProductsController {
    constructor(private readonly productService: ProductService) { }
    @Get()
    @Roles('admin')
    findAll(@isLogin() name: string): string {
        console.log(`Hello ${name}`);
        return this.productService.findAll()
    }

    @Get('verify')
    async getUser(@Headers() headers: any) {
        console.log(headers);
        return ''
    }

    @Get('interception')
    async findOne(@isLogin('firstName') firstName: string) {
        console.log(`Hello ${firstName}`);
    }

    @Post()
    @Roles('admin')
    // @UsePipes(new JoiValidationPipe(CreateProductsDto))
    // @UseFilters(new HttpExceptionFilter())
    create(@Body() createProductsDto: CreateProductsDto ) {

        return this.productService.create(createProductsDto)
    }

    @Get('error')
    error(): any {
        throw new HttpException('Not_Found', HttpStatus.NOT_FOUND);
    }

    @Get('error-custom')
    errorCustom(): any {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'ini adalah error custom',
        }, 403);
    }

}
import { UseInterceptors, Inject, forwardRef, UsePipes, Headers, UseGuards, Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, Header } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUsersDto } from './dto/create-users.dto'
import { LoginUsersDto } from './dto/login-users.dto'
import { HttpExceptionFilter } from '../common/http-exception.filter'
import { JoiValidationPipe } from '../common/joi-validation.pipe'
import { Roles } from '../common/roles.decorator'
import { RolesGuard } from '../common/roles.guard'
import { LoggingInterceptor } from '../common/logging.inteception'
import { isLogin } from '../common/isLogin.decorator'
// import {} from ''

@Controller('users')
export class usersController {
    constructor(private readonly usersService: UsersService) { }


    @Post('/register')
    register(@Body() createUsersDto: CreateUsersDto) {
        console.log(createUsersDto)
        return this.usersService.register(createUsersDto)
    }

    @Post('/login')
    login(@Body() LoginUsersDto: LoginUsersDto) {
        return this.usersService.login(LoginUsersDto)
    }

}
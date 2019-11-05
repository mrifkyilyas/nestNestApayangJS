import { Model } from 'mongoose';
import { Injectable, Inject, forwardRef, HttpStatus, HttpException } from "@nestjs/common";
import { Users } from './interfaces/users.interface'
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDto } from './dto/create-users.dto'
import { LoginUsersDto } from './dto/login-users.dto'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth/auth.service'
import { HttpExceptionFilter } from '../common/http-exception.filter'



@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_MODEL') private readonly usersModel: Model<Users>,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService
    ) { }
    async register(createUsersDto: CreateUsersDto): Promise<Users> {
        const newUser = await new this.usersModel(createUsersDto)
        console.log(newUser)
        return newUser.save()
    }

    async findOne(name: string): Promise<Users | undefined> {
        return this.usersModel.findOne({ name })

    }

    async login(loginUsersDto: LoginUsersDto): Promise<any> {
        const { name, password } = loginUsersDto
        try {
            const found = await this.usersModel.findOne({ name })
            if (found && found.password == password) {
                return this.authService.login(found)
            } else {
                throw Error
            }
        } catch (error) {
            throw new HttpException('password salah', HttpStatus.BAD_REQUEST);

        }
    }
}
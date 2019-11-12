import { Inject, Injectable, forwardRef, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
// import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: any) {
        const payload = { name: user.name, userName: user.userName, id: user._id, type: user.type }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(name: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(name);
        console.log('masuk sini')
        if (user && this.bcryptCompare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    async bcryptHash(password: string): Promise<any> {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    async bcryptCompare(password: string, passwordHash: string): Promise<any> {

        let a = await bcrypt.compareSync(password, passwordHash)
        console.log('masuk sini',a)
        return a
    }

}

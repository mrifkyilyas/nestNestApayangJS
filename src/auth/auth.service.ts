import { Inject,Injectable, forwardRef } from '@nestjs/common';
// import * as bcrypt from 'bcryptjs';
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
        const payload = { name: user.name, role: user.role, id: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(name: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(name);
        if (user && user.password == password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

}

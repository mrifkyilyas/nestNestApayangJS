import { IsString } from 'class-validator';

export class LoginUsersDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly password: string;
}

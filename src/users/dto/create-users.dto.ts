import { IsString } from 'class-validator';

export class CreateUsersDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly role: string
}

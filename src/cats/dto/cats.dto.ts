import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateCats {
    @IsString()
    readonly userName: string;
    @IsString()
    readonly name: string;
    @IsString()
    readonly color: string;
    @IsNumber()
    readonly age: number;
    @IsBoolean()
    readonly health: boolean;
    @IsString()
    readonly password: string;
}


export class LoginCats {
    @IsString()
    readonly userName: string;
    @IsString()
    readonly password: string;
}

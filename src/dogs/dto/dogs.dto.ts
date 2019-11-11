import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateDogs {
    @IsString()
    readonly userName: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly name: string;
    @IsString()
    readonly color: string;
    @IsNumber()
    readonly age: number;
    @IsBoolean()
    readonly health: boolean;
}

export class LoginDogs {
    @IsString()
    readonly userName: string;
    @IsString()
    readonly password: string;
}

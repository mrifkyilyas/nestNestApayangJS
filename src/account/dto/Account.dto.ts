import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class CreateAccount {
    @IsString()
    readonly accountNumber: string;
    @IsNumber()
    readonly balance : string;
    @IsString()
    readonly userId: string;
    @IsString()
    readonly onModel: string;
}


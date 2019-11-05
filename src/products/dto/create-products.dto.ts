import { IsString, IsInt } from 'class-validator';
import { isNumber } from 'util';
export class CreateProductsDto {
    @IsString()
    readonly name: string;
    @IsInt()
    readonly quantity: number;
    @IsString()
    readonly description: string;
    @IsInt()
    readonly price: number
}

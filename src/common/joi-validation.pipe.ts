import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from '@hapi/joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: any) { }

    transform(value: any, metadata: ArgumentMetadata) {
        console.log('here',value)
        // const { error } = Joi.valid(value,this.schema);
        const error = this.schema.validate(value)
        // console.log('ini error', error)
        if (error) {
            console.log('errornya======>',error)
            throw new BadRequestException({
                message:error
            });
        }
        
        return value;
    }
}
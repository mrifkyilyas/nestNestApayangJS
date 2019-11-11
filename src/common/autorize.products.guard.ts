
import { Injectable, CanActivate, ExecutionContext, Request, Inject, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductService } from '../products/products.services'
import { async } from 'rxjs/internal/scheduler/async';


@Injectable()
export class AutorizeProductGuard implements CanActivate {
    constructor(@Inject('ProductService') private readonly ProductService) { }

    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest()
        console.log('masuk guard', req.params.id)
        try {
            let result = await this.ProductService.findProducts({ _id: req.params.id })
            console.log(result, 'ini result')
            if (result && result.userId.id == req.isLogin.id) {
                return true
            } else {
                throw new BadRequestException()
            }
        } catch (error) {
            return false
        }
    }
}

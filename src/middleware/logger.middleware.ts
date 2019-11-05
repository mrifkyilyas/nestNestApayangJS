import { Injectable, NestMiddleware, BadRequestException, } from '@nestjs/common';
import { Request, Response } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        if (!req.headers.token) {
            throw new BadRequestException()
        } else {
            req['isLogin'] = 'lala'           
            next();
        }
    }
}

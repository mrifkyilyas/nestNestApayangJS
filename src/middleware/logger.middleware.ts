import { Injectable, NestMiddleware, BadRequestException, SetMetadata } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log('masuk middleware')
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'rahasia', (err, payload) => {
                if (!err) {
                    req['userLogin'] = payload
                    next();
                } else {
                    throw new BadRequestException('The access token is not valid.')
                }
            });
        } else {
            throw new BadRequestException('The access token is not valid.')
        }

    }
}

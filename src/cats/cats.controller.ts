import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.services';
import { CreateCats, LoginCats } from './dto/cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Get()
  findAll(): any {
    return this.catsService.findAll()
  }

  @Post()
  create(@Body() createCats: CreateCats): any {
    return this.catsService.create(createCats)
  }

  @Post('login')
  login(@Body() loginCats: LoginCats): any {
    return this.catsService.login(loginCats)

  }


  // @Post()
  // @login(@Body loginCats: LoginCats):any {
  // return this.


}
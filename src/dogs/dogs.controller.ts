import { Controller, Get, Post, Body } from '@nestjs/common';
import { DogsService } from './dogs.services';
import { CreateDogs, LoginDogs } from './dto/dogs.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  @Get()
  findAll(): any {
    return this.dogsService.findAll()
  }

  @Post('register')
  create(@Body() createDogs: CreateDogs): any {
    return this.dogsService.create(createDogs)
  }

  @Post('login')
  login(@Body() loginDogs: LoginDogs): any {
    return this.dogsService.login(loginDogs)

  }



}

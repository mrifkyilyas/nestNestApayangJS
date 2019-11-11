import { Controller, Get, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service';
import { RolesGuard } from './common/roles.guard'
import { Roles } from './common/roles.decorator'
import { CatsService } from './cats/cats.services';
import { DogsService } from './dogs/dogs.services';
import xlsx from 'node-xlsx'


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
    private readonly dogsService: DogsService
  ) { }

  // @Get('sini')
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  // getHello(): string {
  //   return this.appService.getHello();
  // }


  // @Get('animal')
  // async getAnimal(): Promise<any> {
  //   try {
  //     let dogs = await this.dogsService.findAll()
  //     let cats = await this.catsService.findAll()
  //     let result = {
  //       status: 200,
  //       message: 'Success get animal',
  //       dogs: dogs,
  //       cats: cats
  //     }

  //     return result

  //   } catch (error) {
  //     return error
  //   }
  // }

  // @Post('animal')
  // @UseInterceptors(FileInterceptor('upload'))
  // async uploadExcel(@UploadedFile() file): Promise<any> {
  //   // const response = {
  //   //   originalname: file.originalname,
  //   //   filename: file.filename,
  //   // };
  //   // return response;
  //   try {
  //     console.log(file.buffer)
  //     const workSheetsFromBuffer = await xlsx.parse(file.buffer);
  //     let animal = workSheetsFromBuffer[0].data
  //     let dogs = []
  //     let cats = []
  //     await animal.map((anim, index) => {
  //       console.log(anim)
  //       let send = {
  //         name: anim[0],
  //         color: anim[3],
  //         health: anim[2],
  //         age: anim[4]
  //       }
  //       return index > 0 ? (anim[1] === 'cat') ? cats.push(send) : dogs.push(send) : ''
  //     })
  //     let queryDogs = this.dogsService.createMany(dogs)
  //     let queryCats = this.catsService.createMany(cats)
  //     let [resultdog, resultcat] = await Promise.all([queryDogs, queryCats])
  //     let result = {
  //       message: 'success seeding from xlsx',
  //       status: "201",
  //       cats: resultcat,
  //       dogs: resultdog
  //     }
  //     return result

  //   } catch (error) {
  //     return error
  //   }

  // }
}

import { Controller, Get, Post, UseInterceptors, UploadedFile, Delete, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import xlsx from 'node-xlsx'
import { AnimalService } from './animal.service';
const path = require('path')


@Controller('animal')
export class AnimalController {
    constructor(
        private readonly animalService: AnimalService,
    ) { }

    @Get()
    async getAnimal(): Promise<any> {
        return this.animalService.findAll()
    }

    @Delete()
    DeleteAllAnimal(): any {
        return this.animalService.deleteAll()
    }

    @Post()
    @UseInterceptors(FileInterceptor('upload', {
        fileFilter: (req: Request, file, callback) => {
            if (!file.originalname.match(/\.(xlsx)$/)) {
                callback(new BadRequestException('Only xlsx files are allowed!'), false);
                return
            }
            callback(null, true);
        }
    }))
    async uploadExcel(@UploadedFile() file): Promise<any> {
        try {
            if (file) {
                const workSheetsFromBuffer = await xlsx.parse(file.buffer)
                let data = workSheetsFromBuffer[0].data
                return this.animalService.uploadExcel(data)
            } else {
                throw new BadRequestException('file required')
            }
        } catch (error) {
            throw error
        }
    }
}



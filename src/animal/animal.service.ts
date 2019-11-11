import { Injectable, Inject } from '@nestjs/common';
import { CatsService } from '../cats/cats.services';
import { DogsService } from '../dogs/dogs.services';



@Injectable()
export class AnimalService {
    constructor(
        private readonly catsService: CatsService,
        private readonly dogsService: DogsService
    ) { }
    async findAll(): Promise<any> {
        try {
            let funcDogs = this.dogsService.findAll()
            let funcCats = this.catsService.findAll()
            let [dogs, cats] = await Promise.all([funcDogs, funcCats])
            let result = {
                status: 200,
                message: 'Success get animal',
                dogs: dogs,
                cats: cats
            }
            return result
        } catch (error) {
            return error
        }
    }

    async deleteAll(): Promise<any> {
        try {
            let funcDogs = this.dogsService.deleteAll()
            let funcCats = this.catsService.deleteAll()
            return await Promise.all([funcDogs, funcCats])

        } catch (error) {
            return error

        }
    }

    async uploadExcel(animal: []): Promise<any> {
        try {
            let dogs = []
            let cats = []
            await animal.map((anim, index) => {
                console.log(anim)
                let send = {
                    name: anim[0],
                    color: anim[3],
                    health: anim[2],
                    age: anim[4],
                    password: `${anim[5]}`,
                    userName: anim[6]
                }
                return index > 0 ? (anim[1] === 'cat') ? cats.push(send) : dogs.push(send) : ''
            })
            let queryDogs = this.dogsService.createMany(dogs)
            let queryCats = this.catsService.createMany(cats)
            let [resultcat, resultdog] = await Promise.all([queryCats, queryDogs])
            let result = {
                message: 'success seeding from xlsx',
                status: "201",
                cats: resultcat,
                dogs: resultdog
            }
            return result
        } catch (error) {
            return error
        }
    }

}

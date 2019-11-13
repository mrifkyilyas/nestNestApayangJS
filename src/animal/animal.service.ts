import { Injectable, Inject } from '@nestjs/common';
import { CatsService } from '../cats/cats.services';
import { DogsService } from '../dogs/dogs.services';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class AnimalService {
    constructor(
        private readonly catsService: CatsService,
        private readonly dogsService: DogsService,
        private readonly authService: AuthService
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
            await animal.map(async (anim, index) => {
                let passHash = await this.authService.bcryptHash(`${anim[5]}`)
                let send = {
                    name: anim[0],
                    color: anim[3],
                    health: anim[2],
                    age: anim[4],
                    password: passHash,
                    userName: anim[6]
                }
                console.log(send)
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

    async teroristParse(list: any): Promise<any> {
        try {
            let arr = []
            list.map((item, index) => {
                if (index > 0) {
                    let arrName = item[0].split(/alias/gi).map(a => a.trim())
                    return arrName.map(arn => {
                        let send = {
                            name: arn,
                            description: item[1],
                            presumed: item[2],
                            densusCode: item[3],
                            birthPlace: item[4],
                            birthDate: item[5],
                            nationality: item[6],
                            address: item[7]
                        }
                        arr.push(send)
                    })
                }
            })           
            return arr


        } catch (error) {
            return error
        }
    }

}

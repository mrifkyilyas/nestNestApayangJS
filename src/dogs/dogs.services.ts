import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Dogs } from './interfaces/dogs.interfaces';
import { Model } from 'mongoose'
import { CreateDogs, LoginDogs } from './dto/dogs.dto'
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DogsService {
  constructor(
    @Inject('DOGS_MODEL') private readonly dogsModel: Model<Dogs>,
    private readonly authService: AuthService) { }

  async findAll(): Promise<[]> {
    try {
      return await this.dogsModel.find()
    } catch (error) {
      return error
    }
  }

  async deleteAll(): Promise<[]> {
    try {
      return await this.dogsModel.deleteMany()
    } catch (error) {
      return error
    }
  }

  async create(createDogs: CreateDogs):
    Promise<Dogs> {
    try {
      const { name, color, health, age, password, userName } = createDogs
      let newDog = await this.dogsModel.create({
        name,
        color,
        health,
        age,
        password,
        userName
      })
      return newDog
    } catch (error) {
      return error
    }
  }

  async createMany(data: any):
    Promise<any> {
    try {
      let newDog = await this.dogsModel.insertMany(
        data, {
        ordered: false
      }
      )
      return {
        success: newDog.length,
        failed: +data.length - +newDog.length,
        newData: newDog
      }
    } catch (error) {
      return error
    }
  }

  async login(loginDogs: LoginDogs): Promise<any> {
    const { userName, password } = loginDogs
    try {
      let found = await this.dogsModel.findOne({ userName })
      if (found && found.password == password) {
        // found = { ...found, type: 'Dogs' }
        // console.log(found)
        found.type = 'Dogs'
        return this.authService.login(found)
      } else {
        throw new BadRequestException('password salah')
      }
    } catch (error) {
      throw new BadRequestException('password salah')
    }
  }

}
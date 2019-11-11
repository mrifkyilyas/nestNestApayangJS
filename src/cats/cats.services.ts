import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Cats } from './interfaces/cats.interfaces';
import { Model } from 'mongoose'
import { CreateCats, LoginCats } from './dto/cats.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class CatsService {
  constructor(
    @Inject('CATS_MODEL') private readonly catsModel: Model<Cats>,
    private readonly authService: AuthService) { }
  async findAll(): Promise<[]> {
    try {
      return await this.catsModel.find()
    } catch (error) {
      return error
    }
  }



  async create(createCats: CreateCats):
    Promise<Cats> {
    try {
      const { name, color, health, age } = createCats
      let newCat = await this.catsModel.create({
        name,
        color,
        health,
        age
      })
      return newCat
    } catch (error) {
      return error
    }
  }

  async getAll() {
    try {
      console.log('masuk')
      let found = await this.catsModel.aggregate([
        {
          $lookup:
          {
            from: "Dogs",
            localField: "userName",
            foreignField: "userName",
            as: "userName"
          }
        }
      ])
    } catch (error) {
      throw error

    }
  }

  async deleteAll() {
    try {
      return await this.catsModel.deleteMany()
    } catch (error) {
      return error
    }
  }

  async createMany(data: any):
    Promise<any> {
    try {
      let newCats = await this.catsModel.insertMany(data, {
        ordered: false
      })
      return {
        success: newCats.length,
        failed: +data.length - +newCats.length,
        newData: newCats
      }
    } catch (error) {
      return error
    }
  }

  async login(loginCats: LoginCats): Promise<any> {
    const { userName, password } = loginCats
    try {
      let found = await this.catsModel.findOne({ userName })
      if (found && found.password == password) {
        found.type = 'Cats'
        return this.authService.login(found)
      } else {
        throw new BadRequestException('password salah')
      }
    } catch (error) {
      throw new BadRequestException('password salah')
    }
  }
}
import { Module } from "@nestjs/common";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";
import { CatsModule } from "../cats/cats.modules";
import { DogsModule } from "../dogs/dogs.modules";

@Module({
    imports: [CatsModule,DogsModule],
    controllers: [AnimalController],
    providers: [AnimalService],
    exports: [AnimalService]
})
export class AnimalModule { }
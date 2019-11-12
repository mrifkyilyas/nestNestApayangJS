import { Module } from "@nestjs/common";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";
import { CatsModule } from "../cats/cats.modules";
import { DogsModule } from "../dogs/dogs.modules";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [CatsModule,DogsModule,AuthModule],
    controllers: [AnimalController],
    providers: [AnimalService],
    exports: [AnimalService]
})
export class AnimalModule { }
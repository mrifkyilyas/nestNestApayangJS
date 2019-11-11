import { Module } from "@nestjs/common";
import { DogsController } from "./dogs.controller";
import { DogsService } from "./dogs.services";
import { DogsProviders } from "./dogs.providers";
import { DatabaseModule } from "../database/database.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        DatabaseModule,AuthModule
    ],
    controllers: [DogsController],
    providers: [DogsService, ...DogsProviders],
    exports: [DogsService]
})
export class DogsModule { }
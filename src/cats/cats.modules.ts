import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.services";
import { catsProviders } from "./cats.providers";
import { DatabaseModule } from "../database/database.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        DatabaseModule,
        AuthModule
    ],
    controllers: [CatsController],
    providers: [CatsService, ...catsProviders],
    exports: [CatsService]
})
export class CatsModule { }
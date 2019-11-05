import { SetMetadata,Header } from '@nestjs/common';


export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

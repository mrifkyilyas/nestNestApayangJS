import { Connection } from 'mongoose';
import { usersSchema } from './schemas/users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) => connection.model('users', usersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
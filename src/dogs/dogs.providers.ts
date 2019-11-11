import { Connection } from 'mongoose'
import { dogsSchema } from './schemas/dogs.schemas'


export const DogsProviders = [
    {
        provide: 'DOGS_MODEL',
        useFactory: (connection: Connection) => connection.model('Dogs', dogsSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
import { Connection } from 'mongoose'
import { catsSchema } from './schemas/cats.schemas'


export const catsProviders = [
    {
        provide: 'CATS_MODEL',
        useFactory: (connection: Connection) => connection.model('Cats', catsSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
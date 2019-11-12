import { Connection } from 'mongoose'
import { accountSchema } from './schema/account.schemas'


export const accountProviders = [
    {
        provide: 'ACCOUNT_MODEL',
        useFactory: (connection: Connection) => connection.model('Account', accountSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
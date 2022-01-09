import { join } from 'path'
import { ConnectionOptions } from 'typeorm'



const PROD_ENV = 'production'

const config = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}


const connectionOptions: ConnectionOptions = {
  type: config.type || 'mysql',
  host: config.host || 'localhost',
  port: parseInt(config.port) || 3306,
  username: config.user || 'root',
  password: config.password || '',
  database: config.database || 'iums',
  entities: ["dist/**/*.entity{.ts,.js}"],
  // We are using migrations, synchronize should be set to false.
  synchronize: true,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [
     'dist/src/migrations/*{.ts,.js}'
  ],
  cli: {
    migrationsDir: 'src/db/migrations'
  }
}

export = connectionOptions
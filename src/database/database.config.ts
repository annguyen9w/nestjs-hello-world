import * as path from 'path'
import * as dotenv from 'dotenv'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'

dotenv.config({ path: path.join(__dirname, '../../.env') })
console.log(path.join(__dirname, '../../.env'))

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  cli: {
    migrationsDir: 'src/database/migration'
  },
  ssl: process.env.NODE_ENV === 'PROD',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  autoLoadEntities: true,
  synchronize: false, // NOTE: should be 'false' to avoid data loss, and to make the migrations work
  migrationsRun: process.env.RUN_MIGRATIONS === 'true', // automatically run migrations
  migrations: [`${__dirname}/migration/*.{ts,js}`]
}

console.log('dbConfig', dbConfig)

export default dbConfig

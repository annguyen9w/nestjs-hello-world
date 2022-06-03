import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import dbConfig from './database.config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig
    })
  ]
})
export class DatabaseModule {}

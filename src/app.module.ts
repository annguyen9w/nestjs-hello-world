import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5
    }),
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}

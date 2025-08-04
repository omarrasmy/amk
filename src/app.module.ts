import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { TagModule } from './tag/tag.module';
import { DatabaseModule } from './database/database.module';
import { RedisConfigModule } from './redis/redis.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    LocationModule,
    TagModule,
    DatabaseModule,
    RedisConfigModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

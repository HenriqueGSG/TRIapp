import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FunciModule } from './funci/funci.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarModule } from './calendar/calendar.module';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    FunciModule,
    CalendarModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FunciModule } from './funci/funci.module';

@Module({
  imports: [FunciModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

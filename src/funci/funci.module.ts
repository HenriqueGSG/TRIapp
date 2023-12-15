import { Module } from '@nestjs/common';
import { FunciController } from './funci.controller';
import { FunciService } from './funci.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Funci, FunciSchema } from './schemas/funci.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Funci', schema: FunciSchema }])
  ],
  controllers: [FunciController],
  providers: [FunciService]
})
export class FunciModule { }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Calendar {

  @Prop()
  monthIntRef: number;

  @Prop()
  month: string;

  @Prop()
  days: { day: string; listFunci: string[]; weekday: string }[];
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);

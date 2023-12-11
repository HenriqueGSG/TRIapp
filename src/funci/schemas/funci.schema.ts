import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class Funci {
  @Prop()
  funciId: string;

  @Prop()
  nome: string;

  @Prop()
  homeDays: string[];
}

export const FunciSchema = SchemaFactory.createForClass(Funci);

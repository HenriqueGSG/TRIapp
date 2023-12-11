import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class Funci {
  @Prop()
  matricula: string;

  @Prop()
  nome: string;

  @Prop()
  homeDays: string[];
}

export const FunciSchema = SchemaFactory.createForClass(Funci);

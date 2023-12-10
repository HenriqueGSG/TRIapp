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
  dias_em_casa: string[];
}

export const FunciSchema = SchemaFactory.createForClass(Funci);

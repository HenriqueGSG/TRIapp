import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Calendar {

    @Prop()
    monthIntRef: number

    @Prop()
    month: string;

    @Prop({ type: [{ day: String, listFunci: [Object] }] })
    days: { day: string; listFunci: any[] }[];

}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);

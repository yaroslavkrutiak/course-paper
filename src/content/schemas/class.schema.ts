import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    credits: number;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
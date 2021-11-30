import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SexEnum} from "../../constants/enums";
import * as Mongoose from "mongoose";

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    age: number;

    @Prop({required: true})
    sex: SexEnum;

    @Prop({ type: Mongoose.Types.ObjectId , ref: 'class', required: false })
    classes: Mongoose.Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
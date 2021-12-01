import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    // @Prop({required: false})
    // _id: mongoose.Schema.Types.ObjectId;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({default: 'USER'})
    role: string

    _id: false
}

export const UserSchema = SchemaFactory.createForClass(User);
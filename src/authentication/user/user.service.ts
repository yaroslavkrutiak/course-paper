import { Injectable } from '@nestjs/common';
import {User, UserDocument} from "../../content/schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Schema, ObjectId} from "mongoose";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) protected readonly userModel: Model<UserDocument>) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({username});
    }
    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findOne({_id: id});
    }
}

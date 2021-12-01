import {Injectable} from '@nestjs/common';
import {User, UserDocument, UserSchema} from "../../content/schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDto} from "../../content/dto/user.dro";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) protected readonly userModel: Model<UserDocument>) {
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({username});
    }

    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findOne({_id: id});
    }

    async insertUser(body: UserDto): Promise<User | undefined> {
        return new this.userModel(body).save();
    }
}

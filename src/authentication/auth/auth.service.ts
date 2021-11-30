import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as mongoose from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password == pass) {
            const { _id, username, role } = user;
            return {_id, username, role};
        }
        return null;
    }

    async findUserById(id): Promise<any> {
        return await this.userService.findById(id)
    }

}
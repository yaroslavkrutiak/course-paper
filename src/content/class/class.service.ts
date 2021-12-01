import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Class, ClassDocument} from "../schemas/class.schema";
import {Model} from "mongoose";
import {ClassDto} from "../dto/class.dto";

@Injectable()
export class ClassService {
    constructor(@InjectModel(Class.name) protected readonly classModel: Model<ClassDocument>) {}

    async getAllClasses(){
        return this.classModel.find({})
    }

    async insertClass(body: ClassDto){
        return new this.classModel(body).save();
    }

    async getClassById(id){
        return this.classModel.findById(id)
    }

    async updateClassById(body, id){
        return this.classModel.updateOne({_id: id}, body)
    }

    async deleteClassById(id){
        return this.classModel.deleteOne({_id: id})
    }
}

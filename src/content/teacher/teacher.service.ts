import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Teacher, TeacherDocument} from "../schemas/teacher.schema";
import {Model, UpdateQuery} from "mongoose";
import {TeacherDto} from "../dto/teacher.dto";
import {Class, ClassDocument} from "../schemas/class.schema";
import {InsertClassDto} from "../dto/class.dto";

@Injectable()
export class TeacherService {
    constructor(@InjectModel(Teacher.name) protected readonly teacherModel: Model<TeacherDocument>,
                @InjectModel(Class.name) protected readonly classModel: Model<ClassDocument>) {}

    async getAllTeachers() {
        return this.teacherModel.find({})
    }

    async getTeacherById(id) {
        return this.teacherModel.findById(id)
    }

    async deleteTeacherById(id) {
        return this.teacherModel.remove({_id: id})
    }

    async updateTeacherById(body: UpdateQuery<TeacherDocument>, id) {
        return this.teacherModel.updateOne({_id: id}, body)
    }

    async getTeacherClasses(id) {
        const teacher = await this.teacherModel.findOne({_id: id}).populate('classes', '', this.classModel).exec()
        return teacher.classes
    }

    async insertTeacher(body: TeacherDto) {
        return new this.teacherModel(body).save();
    }

    async insertTeacherClass(body: InsertClassDto, id: string) {
        const teacher = await this.getTeacherById(id)
        const {_id: classId} = await this.classModel.findOne({name: body.name})
        return this.teacherModel.updateOne({_id: teacher._id}, {classes: [...teacher.classes, classId]})
    }
}

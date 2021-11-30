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
        return this.teacherModel.findById(id)/*.populate('classes')*/
    }

    async deleteTeacherById(id) {
        return this.teacherModel.deleteOne({_id: id})
    }

    async updateTeacherById(body: UpdateQuery<TeacherDocument>, id) {
        return this.teacherModel.updateOne({_id: id}, body)
    }

    async getTeacherClasses(id) {
        const teacher = await this.teacherModel.findOne({_id: id}).populate('classes', '', this.classModel).exec()
        if(Array.isArray(teacher.classes)){
            return teacher.classes
        }else{
            return [teacher.classes]
        }
    }

    async deleteTeacherClasses(id, classId) {
        const classes = await this.getTeacherClasses(id)
        const classesToDelete = [...classes]
        const classesToUpdate = classesToDelete.find(elem => elem._id.toString() !== classId)
        if (Array.isArray(classesToUpdate)){
            const arr = classesToUpdate.map(a => a._id)
            await this.teacherModel.updateOne({_id: id}, {classes: [...arr]})
        }else{
            await this.teacherModel.updateOne({_id: id}, {classes: [classesToUpdate._id]})
        }
        const deletedClass = classesToDelete.find(elem => elem._id.toString() === classId)
        return deletedClass
    }

    async insertTeacher(body: TeacherDto) {
        return new this.teacherModel(Object.assign(body, {classes:[]})).save();
    }

    async insertTeacherClass(body: InsertClassDto, id: string) {
        const teacher = await this.getTeacherById(id)
        const {_id: classId} = await this.classModel.findOne({name: body.name})
        return this.teacherModel.updateOne({_id: teacher._id}, {classes: [...teacher.classes, classId]})
    }
}

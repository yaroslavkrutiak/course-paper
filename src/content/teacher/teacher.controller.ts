import {Body, Controller, Delete, Get, Param, Post, Put, Render, Res, UseGuards} from '@nestjs/common';
import {TeacherService} from "./teacher.service";
import {TeacherDto} from "../dto/teacher.dto";
import {InsertClassDto} from "../dto/class.dto";

@Controller('api/teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Get('')
    @Render('teacher')
    getAllTeachers() {
        return this.teacherService.getAllTeachers();
    }

    //TODO get teachers by query request

    @Get(':id')
    @Render('teacher/single.hbs')
    getTeacherById(@Param('id') id) {
        return this.teacherService.getTeacherById(id);
    }

    @Delete(':id')
    deleteTeacherById(@Param('id') id) {
        return this.teacherService.deleteTeacherById(id);
    }

    @Put(':id')
    updateTeacher(@Body() body, @Param('id') id) {
        return this.teacherService.updateTeacherById(body, id);
    }

    @Get(':id/class' )
    @Render('teacher/class.hbs')
    getTeacherClasses(@Param('id') id) {
        return this.teacherService.getTeacherClasses(id);
    }

    @Delete(':id/class/:classId' )
    deleteTeacherClasses(@Param('id') id, @Param('classId') classId) {
        return this.teacherService.deleteTeacherClasses(id, classId);
    }

    @Post('')
    async insertTeacher(@Body() body: TeacherDto, @Res({ passthrough: true }) response){
        await this.teacherService.insertTeacher(body)
        response.redirect('http://localhost:3000/api/teacher/')
    }

    @Put(':id/class')
    insertTeacherClass(@Body() body: InsertClassDto, @Param('id') id){
        return this.teacherService.insertTeacherClass(body, id)
    }
}

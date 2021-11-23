import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {TeacherService} from "./teacher.service";
import {TeacherDto} from "../dto/teacher.dto";
import {InsertClassDto} from "../dto/class.dto";

@Controller('api/teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Get('')
    getAllTeachers() {
        return this.teacherService.getAllTeachers();
    }

    //TODO get teachers by query request

    @Get(':id')
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
    getTeacherClasses(@Param('id') id) {
        return this.teacherService.getTeacherClasses(id);
    }

    @Post('')
    insertTeacher(@Body() body: TeacherDto){
        return this.teacherService.insertTeacher(body)
    }

    @Put(':id/class')
    insertTeacherClass(@Body() body: InsertClassDto, @Param('id') id){
        return this.teacherService.insertTeacherClass(body, id)
    }
}

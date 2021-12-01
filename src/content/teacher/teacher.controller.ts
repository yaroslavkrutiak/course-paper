import {
    Body,
    Controller,
    Delete, ForbiddenException,
    Get,
    Param,
    Post,
    Put,
    Render,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {TeacherService} from "./teacher.service";
import {TeacherDto} from "../dto/teacher.dto";
import {InsertClassDto} from "../dto/class.dto";
import {UserService} from "../../authentication/user/user.service";

@Controller('api/teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService,
                protected readonly userService: UserService) {
    }

    @Get('')
    @Render('teacher')
    getAllTeachers() {
        return this.teacherService.getAllTeachers();
    }

    @Get(':id')
    @Render('teacher/single.hbs')
    getTeacherById(@Param('id') id) {
        return this.teacherService.getTeacherById(id);
    }

    @Delete(':id')
    async deleteTeacherById(@Req() request, @Param('id') id) {
        const {auth} = request.cookies
        console.log(auth)
        const user = await this.userService.findById(auth)
        if (!user)
            throw new UnauthorizedException()
        if (user.role !== 'ADMIN')
            throw new ForbiddenException()
        return this.teacherService.deleteTeacherById(id);
    }

    @Put(':id')
    async updateTeacher(@Req() request, @Body() body, @Param('id') id) {
        const {auth} = request.cookies
        const user = await this.userService.findById(auth)
        if (!user)
            throw new UnauthorizedException()
        if (user.role !== 'ADMIN')
            throw new ForbiddenException()
        return this.teacherService.updateTeacherById(body, id);
    }

    @Get(':id/class')
    @Render('teacher/class.hbs')
    getTeacherClasses(@Param('id') id) {
        return this.teacherService.getTeacherClasses(id);
    }

    @Delete(':id/class/:classId')
    async deleteTeacherClasses(@Req() request, @Param('id') id, @Param('classId') classId) {
        const {auth} = request.cookies
        const user = await this.userService.findById(auth)
        if (!user)
            throw new UnauthorizedException()
        if (user.role !== 'ADMIN')
            throw new ForbiddenException()
        return this.teacherService.deleteTeacherClasses(id, classId);
    }

    @Post('')
    async insertTeacher(@Body() body: TeacherDto, @Res({passthrough: true}) response) {
        await this.teacherService.insertTeacher(body)
        response.redirect('http://localhost:3000/api/teacher/')
    }

    @Put(':id/class')
    async insertTeacherClass(@Req() request, @Body() body: InsertClassDto, @Param('id') id) {
        const {auth} = request.cookies
        const user = await this.userService.findById(auth)
        if (!user)
            throw new UnauthorizedException()
        if (user.role !== 'ADMIN')
            throw new ForbiddenException()
        return this.teacherService.insertTeacherClass(body, id)
    }
}

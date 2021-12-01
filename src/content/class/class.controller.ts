import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    Post,
    Put,
    Render,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import {ClassService} from "./class.service";
import {ClassDto} from "../dto/class.dto";
import {UserService} from "../../authentication/user/user.service";

@Controller('api/class')
export class ClassController {
    constructor(protected readonly classService: ClassService,
                protected readonly userService: UserService) {
    }

    @Get('')
    @Render('class')
    async getAllClasses(@Req() request) {
        return this.classService.getAllClasses();
    }

    @Post('')
    insertClass(@Body() body: ClassDto) {
        return this.classService.insertClass(body);
    }

    @Get(':id')
    @Render('class/single.hbs')
    getClassById(@Param('id') id) {
        return this.classService.getClassById(id);
    }

    @Put(':id')
    async updateClassById(@Req() request, @Body() body, @Param('id') id) {
        const {auth} = request.cookies
        const user = await this.userService.findById(auth)
        if (!user)
            throw new UnauthorizedException()
        if (user.role !== 'ADMIN')
            throw new ForbiddenException()
        return this.classService.updateClassById(body, id);
    }

    @Delete(':id')
    async deleteClassById(@Req() request, @Param('id') id) {
        const {auth} = request.cookies
        const user = await this.userService.findById(auth)
        if (!user)
            throw new UnauthorizedException()
        if (user.role !== 'ADMIN')
            throw new ForbiddenException()
        return this.classService.deleteClassById(id);
    }
}


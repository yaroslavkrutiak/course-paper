import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ClassService} from "./class.service";
import {ClassDto} from "../dto/class.dto";

@Controller('api/class')
export class ClassController {
    constructor(protected readonly classService: ClassService) {}

    @Get('')
    getAllClasses() {
        return this.classService.getAllClasses();
    }

    @Post('')
    insertClass(@Body() body: ClassDto) {
        return this.classService.insertClass(body);
    }

    @Get(':id')
    getClassById(@Param('id') id) {
        return this.classService.getClassById(id);
    }

    @Put(':id')
    updateClassById(@Body() body, @Param('id') id) {
        return this.classService.updateClassById(body, id);
    }

    @Delete(':id')
    deleteClassById(@Param('id') id) {
        return this.classService.deleteClassById(id);
    }
}


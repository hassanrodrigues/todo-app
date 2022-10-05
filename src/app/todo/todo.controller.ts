import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, HttpCode, HttpStatus } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger/dist';

import { CreateTodoDto } from './dto/create-todo.dto';

import { updateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('Todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }


    @Get()
    async index() {
        return await this.todoService.findAll();
    }

    @Post()
    async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: updateTodoDto) {
        return await this.todoService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param("id", new ParseUUIDPipe()) id: string) {
        await this.todoService.deleteById(id)
    }


}

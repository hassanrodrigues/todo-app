import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { CreateTodoDto } from './dto/create-todo.dto';
import { BadRequestSwagger } from '../../helps/swagger/bad-request.swagger';
import { updateTodoDto } from './dto/update-todo.dto';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { TodoService } from './todo.service';
import { ShowTodoSwagger } from './swagger/show-todo.swagger';
import { NotFoundSwagger } from 'src/helps/swagger/not-found.swagger';
import { updateTodoSwagger } from './swagger/update-todo.swagger';

@Controller('api/v1/todos')
@ApiTags('ToDos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    @ApiOperation({
        summary: 'Listar todas a tarefas'
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tarefas retornada com sucesso',
        type: IndexTodoSwagger,
        isArray: true,
    })
    async index() {
        return await this.todoService.findAll();
    }

    @Post()
    @ApiOperation({
        summary: 'Cria uma nova tarefa'
    })
    @ApiResponse({
        status: 201,
        description: 'Nova tarefa criada com sucesso',
        type: CreateTodoSwagger,
    })
    @ApiResponse({
        status: 400,
        description: 'Parâmetros inválidos',
        type: BadRequestSwagger,
    })
    async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obter tarefa por id'
    })
    @ApiResponse({
        status: 200,
        description: 'Dados de uma tarefa retornado com sucesso',
        type: ShowTodoSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
    })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Atualizar a tarefa por id'
    })
    @ApiResponse({
        status: 200,
        description: 'Tarefa atualizada com sucesso',
        type: updateTodoSwagger,
    })
    @ApiResponse({
        status: 400,
        description: 'Dados inválidos',
        type: BadRequestSwagger,
    })
    @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
    })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: updateTodoDto) {
        return await this.todoService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma tarefa' })
    @ApiResponse({ status: 204, description: 'Tarefa removida com sucesso' })
    @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param("id", new ParseUUIDPipe()) id: string) {
        await this.todoService.deleteById(id)
    }
}

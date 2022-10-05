import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTodoDto } from './dto/create-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>) { }

    async findAll() {
        return await this.todoRepository.find()
    }

    async findOne(id: string) {
        try {
            return await this.todoRepository.findOneOrFail({
                where: { id }
            });
        } catch (error) {
            throw new Error(error)
        }
    }

    async create(data: CreateTodoDto) {
        return await this.todoRepository.save(this.todoRepository.create(data))
    }

    async update(id: string, data: updateTodoDto) {
        const todo = await this.findOne(id);

        this.todoRepository.merge(todo, data)

        return await this.todoRepository.save(todo)
    }

    async deleteById(id: string) {
        await this.findOne(id);


        await this.todoRepository.softDelete(id);
    }


}

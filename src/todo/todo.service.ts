import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { TodoMongoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoMongoRepository: TodoMongoRepository) {}

  createTodo(todo: TodoDto) {
    return this.todoMongoRepository.createTodo(todo);
  }

  async getTodos() {
    return await this.todoMongoRepository.getTodos();
  }

  async getTodo(id: string) {
    return await this.todoMongoRepository.getTodo(id);
  }

  deleteTodo(id: string) {
    return this.todoMongoRepository.deleteTodo(id);
  }

  updateTodo(id: string, todo: TodoDto) {
    return this.todoMongoRepository.updateTodo(id, todo);
  }
}

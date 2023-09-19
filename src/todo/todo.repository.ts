import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { TodoDto } from './todo.dto';

export interface TodoRepository {
  createTodo(todo: TodoDto);
  getTodos();
  getTodo(id: string);
  deleteTodo(id: string);
  updateTodo(id: string, todo: TodoDto);
}

@Injectable()
export class TodoMongoRepository implements TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  createTodo(todo: TodoDto) {
    try {
      return this.todoModel.create(todo);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getTodos() {
    try {
      return await this.todoModel.find();
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getTodo(id: string) {
    try {
      return await this.todoModel.findById(id);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.todoModel.findByIdAndDelete(id);
      return { message: '삭제에 성공했습니다.' };
    } catch (err) {
      throw new BadRequestException();
    }
  }

  updateTodo(id: string, todo: TodoDto) {
    try {
      return this.todoModel.findByIdAndUpdate(id, todo, { new: true });
    } catch (err) {
      throw new BadRequestException();
    }
  }
}

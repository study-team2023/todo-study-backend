import { Post, Body, Get, Delete, Put, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('todo')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('create')
  @ApiOperation({
    summary: '투두 생성 API',
    description: '투두리스트의 투두를 생성한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  @ApiBody({
    schema: {
      example: {
        title: '투두제목이에용',
        desc: '내용입니당',
      },
    },
  })
  createTodo(@Body() todo) {
    return this.todoService.createTodo(todo);
  }

  @Get('')
  @ApiOperation({
    summary: '전체 투두리스트 가져오는 API',
    description: '전체 투두리스트 정보를 가져온다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  @ApiOperation({
    summary: '단일 투두 가져오는 API',
    description: '투두리스트 중 해당하는 하나의 정보를 가져온다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description:
      '투두의 id를 http://localhost:3000/todo/{투두의 id} url로 요청한다. ({투두의 id}: 실제 투두아이디를 보내야 합니다.)',
    required: true,
  })
  getTodo(@Param('id') id) {
    return this.todoService.getTodo(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '단일 투두 삭제 API',
    description: '투두리스트 중 해당하는 하나의 정보를 삭제한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description:
      '투두의 id를 http://localhost:3000/todo/{투두의 id} url로 요청한다. ({투두의 id}: 실제 투두아이디를 보내야 합니다.)',
    required: true,
  })
  deleteTodo(@Param('id') id) {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: '단일 투두 수정 API',
    description: '투두리스트 중 해당하는 하나의 정보를 수정한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description:
      '투두의 id를 http://localhost:3000/todo/{투두의 id} url로 요청한다. ({투두의 id}: 실제 투두아이디를 보내야 합니다.)',
    required: true,
  })
  @ApiBody({
    schema: {
      example: {
        title: '수정투두제목이에용',
        desc: '수정내용입니당',
      },
    },
  })
  updateTodo(@Param('id') id, @Body() todo) {
    return this.todoService.updateTodo(id, todo);
  }
}

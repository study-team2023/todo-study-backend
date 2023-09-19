import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

const option: SchemaOptions = {
  timestamps: true,
};

@Schema(option)
export class Todo {
  @Prop()
  title: string;

  @Prop()
  desc: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

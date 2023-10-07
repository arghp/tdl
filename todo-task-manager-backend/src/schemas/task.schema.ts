import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Priority } from './../models/priority.enum';
import { Status } from './../models/status.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: Status;

  @Prop()
  category: string;

  @Prop() 
  priority: Priority;

  @Prop() 
  dueDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

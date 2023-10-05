import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.taskModel.findOne({ _id: { $eq: id } }).lean().exec();
  }

  async updateTaskById(id: string, createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.findOneAndUpdate(
      { _id: { $eq: id } }, 
      { $set: { 
          title: createTaskDto.title,
          description: createTaskDto.description,
          status: createTaskDto.status,
          category: createTaskDto.category
        } 
      }, 
      { new: true, upsert: true }
    );
  }

  async deleteTaskById(id: string): Promise<any> {
    return await (await this.taskModel.deleteOne({ _id: { $eq: id } }).lean().exec()).deletedCount;
  }


}

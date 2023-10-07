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

  async getAllTasks(query: any): Promise<Task[]> {
    let mongoQuery: any = {};
    if (query?.status) {
      mongoQuery.status = { $eq: query.status };
    }
    if (query?.priority) {
      mongoQuery.priority = { $eq: query.priority };
    }
    if (query?.category) {
      mongoQuery.priority = { $eq: query.category };
    }
    if (query?.page && query?.perPage) {
      const page = parseInt(query.page, 10);
      const perPage = parseInt(query.perPage, 10);
      return this.taskModel.find(mongoQuery).skip(page).limit(perPage).exec();
    }

    return this.taskModel.find(mongoQuery).exec();
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

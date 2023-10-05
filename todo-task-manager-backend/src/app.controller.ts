import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.appService.getAllTasks();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.appService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTaskById(@Param() params): Promise<Task> {
    return await this.appService.getTaskById(params.id);
  }

  @Put('/:id')
  async updateTaskById(@Param() params, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.appService.updateTaskById(params.id, createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(@Param() params): Promise<any> {
    return await this.appService.deleteTaskById(params.id);
  }
}

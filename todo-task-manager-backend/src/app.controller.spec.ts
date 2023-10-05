import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        { title: 'Task 1', description: 'Description 1', status: 'todo', category: 'general' },
        { title: 'Task 2', description: 'Description 2', status: 'done', category: 'work' },
      ];
      jest.spyOn(appService, 'getAllTasks').mockResolvedValue(tasks);

      expect(await appController.getAllTasks()).toBe(tasks);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Description for the new task',
        status: 'todo',
        category: 'general',
      };
      const createdTask: Task = {
        ...createTaskDto,
      };
      jest.spyOn(appService, 'createTask').mockResolvedValue(createdTask);

      expect(await appController.createTask(createTaskDto)).toBe(createdTask);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = '12345';
      const task: Task = {
        title: 'Task 1',
        description: 'Description 1',
        status: 'todo',
        category: 'general'
      };
      jest.spyOn(appService, 'getTaskById').mockResolvedValue(task);

      expect(await appController.getTaskById({ id: taskId })).toBe(task);
    });
  });

  describe('updateTaskById', () => {
    it('should update a task by ID', async () => {
      const taskId = '12345';
      const createTaskDto: CreateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'done',
        category: 'work',
      };
      const updatedTask: Task = {
        ...createTaskDto
      };
      jest.spyOn(appService, 'updateTaskById').mockResolvedValue(updatedTask);

      expect(await appController.updateTaskById({ id: taskId }, createTaskDto)).toBe(updatedTask);
    });
  });

  describe('deleteTaskById', () => {
    it('should delete a task by ID', async () => {
      const taskId = '12345';
      jest.spyOn(appService, 'deleteTaskById').mockResolvedValue({ deletedCount: 1 });

      expect(await appController.deleteTaskById({ id: taskId })).toEqual({ deletedCount: 1 });
    });
  });
});

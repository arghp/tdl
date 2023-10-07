import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Priority } from './models/priority.enum';
import { Status } from './models/status.enum';
import { Task } from './schemas/task.schema';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  class mockModel {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
  }
  const createTaskDto: CreateTaskDto = {
    title: 'test',
    description: 'test',
    status: Status.NOT_STARTED,
    category: 'test',
    priority: Priority.LOW,
    dueDate: undefined
  }; 
  const task: Task = {
    title: '',
    description: '',
    status: Status.NOT_STARTED,
    category: 'test',
    priority: Priority.LOW,
    dueDate: undefined
  }; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService,
        {
          provide: getModelToken(Task.name),
          useValue: mockModel,
        }
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [];
      const query = {};

      jest.spyOn(appService, 'getAllTasks').mockResolvedValue(tasks);

      const result = await appController.getAllTasks(query);

      expect(result).toBe(tasks);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      

      jest.spyOn(appService, 'createTask').mockResolvedValue(task);

      const result = await appController.createTask(createTaskDto);

      expect(result).toBe(task);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = '123'; // Replace with an actual task ID

      jest.spyOn(appService, 'getTaskById').mockResolvedValue(task);

      const result = await appController.getTaskById({ id: taskId });

      expect(result).toBe(task);
    });
  });

  describe('updateTaskById', () => {
    it('should update a task by ID', async () => {
      const taskId = '123';

      jest.spyOn(appService, 'updateTaskById').mockResolvedValue(task);

      const result = await appController.updateTaskById({ id: taskId }, createTaskDto);

      expect(result).toBe(task);
    });
  });

  describe('deleteTaskById', () => {
    it('should delete a task by ID', async () => {
      const taskId = '123'; 
      const deleteResult = 1

      jest.spyOn(appService, 'deleteTaskById').mockResolvedValue(deleteResult);

      const result = await appController.deleteTaskById({ id: taskId });

      expect(result).toBe(deleteResult);
    });
  });
});

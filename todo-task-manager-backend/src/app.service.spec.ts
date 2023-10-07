import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Priority } from './models/priority.enum';
import { Status } from './models/status.enum';
import { Task, TaskDocument } from './schemas/task.schema';

// Mock the mongoose Model
class mockModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
}

describe('AppService', () => {
  let appService: AppService;
  let taskModel: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken(Task.name),
          useValue: mockModel,
        },
      ],
    }).compile();
    taskModel = module.get<Model<Task>>(getModelToken(Task.name));
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: Status.IN_PROGRESS,
        category: 'Test Category',
        priority: Priority.HIGH,
        dueDate: new Date(),
      };

      const createdTask = await appService.createTask(createTaskDto);

      expect(createdTask).toBeDefined();
      expect(createdTask).toEqual(createTaskDto);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      taskModel.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue([])
      }));

      const tasks = await appService.getAllTasks({});

      expect(tasks).toBeDefined();
      expect(tasks).toEqual([]);
    });

    it('should return add filters', async () => {
      taskModel.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue([])
      }));
      const taskModelFindSpy = jest
        .spyOn(taskModel, 'find')

      const query = {
        status: "status",
        priority: "priority",
        category: "category"
      }
      const mongooseQuery = {
        status: {"$eq": query.status},
        priority: {"$eq": query.priority},
        category: {"$eq": query.category}
      }

      const tasks = await appService.getAllTasks(query);

      expect(tasks).toBeDefined();
      expect(taskModelFindSpy).toBeCalledWith(mongooseQuery);
      expect(tasks).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      taskModel.findOne = jest.fn().mockImplementationOnce(() => ({
        lean: jest.fn().mockImplementationOnce(() => ({
          exec: jest.fn().mockReturnValue({}),
        }))
      }));
      const taskId = '1234567890';
      const task = await appService.getTaskById(taskId);

      expect(task).toBeDefined();
      expect(task).toEqual({});
    });
  });

  describe('updateTaskById', () => {
    it('should update a task by ID', async () => {
      const taskId = '1234567890';
      const createTaskDto: CreateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        status: Status.DONE,
        category: 'Updated Category',
        priority: Priority.LOW,
        dueDate: new Date(),
      };
      taskModel.findOneAndUpdate = jest.fn().mockReturnValue(createTaskDto);

      const updatedTask = await appService.updateTaskById(taskId, createTaskDto);

      expect(updatedTask).toBeDefined();
      expect(updatedTask).toEqual(createTaskDto);
    });
  });

  describe('deleteTaskById', () => {
    it('should delete a task by ID', async () => {
      taskModel.deleteOne = jest.fn().mockImplementationOnce(() => ({
        lean: jest.fn().mockImplementationOnce(() => ({
          exec: jest.fn().mockReturnValue({deletedCount: 1}),
        }))
      }));
      const taskId = '1234567890';
      const result = await appService.deleteTaskById(taskId);

      expect(result).toEqual(1);
    });
  });
});

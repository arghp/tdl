import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { getModelToken } from '@nestjs/mongoose';

// Mock the mongoose model
class MockTaskModel {
  static data: any;
  
  constructor(private data: Task) {}

  static create(data: Task) {
    return new MockTaskModel(data);
  }

  save() {
    return this.data;
  }

  static find() {
    return {
      exec: jest.fn().mockResolvedValue([this.data]),
    };
  }

  static findOne() {
    return {
      lean: jest.fn().mockResolvedValue(this.data),
      exec: jest.fn().mockResolvedValue(this.data),
    };
  }

  static findOneAndUpdate() {
    return {
      lean: jest.fn().mockResolvedValue(this.data),
      exec: jest.fn().mockResolvedValue(this.data),
    };
  }

  static deleteOne() {
    return {
      lean: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    };
  }
}

describe('AppService', () => {
  let mockTask: Task = {
    "title": "test",
    "description": "test",
    "status": "done",
    "category": "personal"
  }
  let appService: AppService;
  let mockTaskModel: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken(Task.name),
          useValue: MockTaskModel,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    mockTaskModel = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'This is a test task',
      status: 'todo',
      category: 'general',
    };

    const result = await appService.createTask(createTaskDto);

    expect(result).toEqual(createTaskDto);
  });

  it('should get all tasks', async () => {
    const result = await appService.getAllTasks();

    expect(result).toEqual([mockTask]);
  });

  it('should get a task by ID', async () => {
    const taskId = '1234567890';
    const result = await appService.getTaskById(taskId);

    expect(result).toEqual(mockTask);
  });

  it('should update a task by ID', async () => {
    const taskId = '1234567890';
    const createTaskDto: CreateTaskDto = {
      title: 'Updated Task',
      description: 'This is an updated test task',
      status: 'done',
      category: 'work',
    };

    const result = await appService.updateTaskById(taskId, createTaskDto);

    expect(result).toEqual(createTaskDto);
  });

  it('should delete a task by ID', async () => {
    const taskId = '1234567890';
    const result = await appService.deleteTaskById(taskId);

    expect(result).toEqual({ deletedCount: 1 });
  });
});

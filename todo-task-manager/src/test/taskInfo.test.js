
import { shallowMount } from '@vue/test-utils';
import TaskInfo from '../components/TaskInfo.vue';

describe('TaskInfo', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TaskInfo)
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('edits a task', () => {
    const taskToEdit = {
      id: 1,
      title: 'Edited Task',
      description: 'Edited description',
      completed: 'in progress',
      category: 'work',
      priority: 'high',
      dueDate: '',
    };

    wrapper.vm.editItem(taskToEdit);

    expect(wrapper.vm.formTitle).toBe('Edit Task');
    expect(wrapper.vm.editedItem).toEqual(taskToEdit);
  });

  it('deletes a task', () => {
    const taskToDelete = {
      id: 1,
      title: 'Task to Delete',
      description: 'Description to delete',
      completed: 'not started',
      category: 'personal',
      priority: 'high',
      dueDate: '',
    };

    // Add the task to the component's data
    wrapper.setData({
      tasks: [taskToDelete],
    });

    wrapper.vm.deleteItem(taskToDelete);
    wrapper.vm.deleteItemConfirm();

    expect(wrapper.vm.tasks.length).toBe(0);
  });

  it('saves a task', () => {
    const taskToSave = {
      id: 1,
      title: 'Task to Save',
      description: 'Description to save',
      completed: 'not started',
      category: 'personal',
      priority: 'high',
      dueDate: '',
    };

    // Simulate editing the task
    wrapper.vm.editedItem = taskToSave;
    wrapper.vm.save();

    // Check if the task has been saved
    expect(wrapper.vm.tasks).toContainEqual(taskToSave);
  });

  it('generates a new task ID based on the next ID available', () => {

    wrapper.setData({
      tasks: [
        { id: 1, title: 'Task 1', description: 'Description 1', completed: 'not started', category: 'personal', priority: 'high', dueDate: '', },
        { id: 2, title: 'Task 2', description: 'Description 2', completed: 'in progress', category: 'work', priority: 'high',  dueDate: '', },
      ],
    });

    const newId = wrapper.vm.generateNewTaskId();

    expect(newId).toBe(3);
  });


  it('duplicates task', () => {
    const taskToDuplicate = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: 'not started',
      category: 'personal',
      priority: 'high',
      dueDate: '2023-12-10',
    };

    const newId = wrapper.vm.generateNewTaskId();

    wrapper.vm.duplicateTask(taskToDuplicate);

    // Check if a new task has been added with the expected values
    const duplicatedTask = wrapper.vm.tasks.find(task => task.id === newId); // ID should be 2 based on the mock function
    expect(duplicatedTask).toBeTruthy(); // Check if the task exists
    expect(duplicatedTask.title).toBe('Copy of Task 1');
    expect(duplicatedTask.description).toBe('Description 1');
    expect(duplicatedTask.completed).toBe('not started');
    expect(duplicatedTask.category).toBe('personal');
    expect(duplicatedTask.priority).toBe('high');
    expect(duplicatedTask.dueDate).toBe('2023-12-10');

  });




  }
)

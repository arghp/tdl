
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
    };

    // Simulate editing the task
    wrapper.vm.editedItem = taskToSave;
    wrapper.vm.save();

    // Check if the task has been saved
    expect(wrapper.vm.tasks).toContainEqual(taskToSave);
  });




  }
)

<template>
  <h1 class="section-header">My Tasks</h1>

  <br>

  <v-container
    style="width: 50%; margin-bottom: 2em;">
     <VCalendar
       :columns="2"
       :attributes="generateAttributes()"
       :timezone="'UTC'"
     ></VCalendar>
  </v-container>

  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="tasks"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    class="elevation-1"
    :search="search"
    rounded
  >


    <template v-slot:top>
      <v-toolbar
        flat
      >
         <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          show-expand
          class="ml-4"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="700px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="#5CA277"
              dark
              class="mb-2"
              v-bind="props"
            >
              New Task
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Task"
                      :rules="[requiredRule]"
                    ></v-text-field>
                     </v-col>
                  <v-col>
                    <v-select
                      v-model="editedItem.priority"
                      label="Priority"
                      :items="['high', 'medium', 'low']"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >

                    <v-combobox
                      v-model="editedItem.category"
                      label="Category"
                      :items="['home', 'personal', 'school', 'work', 'other']"
                    ></v-combobox>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >

                    <v-select
                      v-model="editedItem.completed"
                      label="Status"
                      :items="['not started', 'in progress', 'done']"
                    ></v-select>
                  </v-col>

                  <v-col>
                   <v-text-field
                      v-model="editedItem.dueDate"
                      label="Due date"
                      type="date"
                      required

                  ></v-text-field>
                  </v-col>

                </v-row>
                <v-row>

                  <v-col>
                    <v-textarea
                      v-model="editedItem.description"
                      label="Description"
                      clearable
                      clear-icon="mdi-close-circle"
                    ></v-textarea>

                  </v-col>


                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
                data-testid="save-button"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="700px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.completed="{ item }">
      <v-chip :color="getColor(item)">
        {{ item.raw.completed }}
      </v-chip>
    </template>

    <template v-slot:item.priority="{ item }">
      <v-chip :color="getPriorityColor(item)">
        {{ item.raw.priority }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        class="me-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
        size="small"
        class="me-2"
        @click="duplicateTask(item)"
      >
        mdi-content-duplicate
      </v-icon>

    </template>

    <template v-slot:expanded-row="{ item }">
      <tr>
        <td :colspan="12" style="white-space: pre-wrap; color:grey;">
           {{ item.raw.description }}
        </td>
      </tr>
    </template>

    <template v-slot:no-data>
      <br>
      <br>
        No Tasks
      <br>
      <br>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>



</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: 'Task', key: 'title', align: 'start', sortable: true },
      { title: 'Status', key: 'completed', sortable: true },
      { title: 'Category', key: 'category', sortable: true },
      { title: 'Priority', key: 'priority', sortable: true },
      { title: 'Due Date', key: 'dueDate',  sortable: true },
      { title: '', key: 'actions', align: 'end', sortable: false },
      { title: '', key: 'data-table-expand', align: 'end', sortable: false },
    ],
    tasks: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      description: '',
      completed: '',
      category: '',
      priority: '',
      dueDate:'',
    },
    expanded: [],
    defaultItem: {
      title: '',
      description: '',
      completed: '',
      category: '',
      priority: '',
      dueDate:'',
    },
    search: '',
    requiredRule: (v) => !!v || 'Task name is required.',
    attributes: [],
    currentMonthYear: {
        month: 0, // Initial value (January)
        year: 2023, // Initial value (replace with the current year)
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
    const now = new Date();
    this.currentMonthYear.month = now.getMonth();
    this.currentMonthYear.year = now.getFullYear();
  },

  methods: {
    initialize () {
      this.tasks = [
        {
          id: 1,
          title: 'Task 1',
          description: 'my first task',
          completed: 'not started',
          category: 'personal',
          priority: 'low',
          dueDate:'2023-10-28',
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'my second task',
          completed: 'in progress',
          category: 'work',
          priority: 'medium',
          dueDate:'',
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'my third task',
          completed: 'done',
          category: 'other',
          priority: 'high',
          dueDate: '',
        },
      ]
    },

    editItem (item) {
      let taskToFind = JSON.parse(JSON.stringify(item)).raw
      if (!taskToFind) {taskToFind = item}
      this.editedIndex = this.tasks.findIndex(task => task.id === taskToFind.id)
      this.editedItem = Object.assign({}, taskToFind)
      this.dialog = true
    },

    deleteItem (item) {
      let taskToFind = JSON.parse(JSON.stringify(item)).raw
      if (!taskToFind) {taskToFind = item}
      this.editedIndex = this.tasks.findIndex(task => task.id === taskToFind.id)
      this.editedItem = Object.assign({}, taskToFind)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.tasks.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tasks[this.editedIndex], this.editedItem)
      } else {
        this.tasks.push(this.editedItem)
      }
      this.close()
    },

    getColor (item) {
      let taskStatus = item.raw.completed
      console.log('completed', taskStatus)
      if (taskStatus === 'not started') return 'red'
      else if (taskStatus === 'in progress') return 'orange'
      else if (taskStatus === 'done') return 'green'
      else return 'white'
    },

    getPriorityColor (item) {
      let taskPriority = item.raw.priority
      if (taskPriority === 'high') return '#B02753'
      else if (taskPriority === 'medium') return '#278AB0'
      else if (taskPriority === 'low') return '#DDAC94'
      else return 'white'
    },

    generateNewTaskId() {
      // Find the highest existing task ID
      const maxId = Math.max(...this.tasks.map(task => task.id));
      return maxId + 1;
    },

    duplicateTask(item) {

      let currentTask = JSON.parse(JSON.stringify(item)).raw
      if (!currentTask) {currentTask = item}

      const newId = this.generateNewTaskId();
      const duplicatedTask = {
        id: newId,
        title: "Copy of " + currentTask.title,
        description: currentTask.description,
        completed: currentTask.completed,
        category: currentTask.category,
        priority: currentTask.priority,
        dueDate: currentTask.dueDate,
      };

      this.tasks.push(duplicatedTask);
    },
     generateAttributes() {
      const attributes = [];
      const tasksWithDueDate = this.tasks.filter((task) => task.dueDate);

      tasksWithDueDate.forEach((task) => {
        const dueDate = new Date(task.dueDate);
        const utcString = dueDate.toUTCString()+1;

        let dotColors = {
            'high': 'pink',
            'medium': 'teal',
            'low': 'orange'
        }

        let taskPriority = task.priority
        attributes.push({
          dot: dotColors[taskPriority],
          dates: [utcString],
        });
      });

      return attributes;
    },

},

}



</script>


<style>


</style>

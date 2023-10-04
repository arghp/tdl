<template>
  <h1 class="section-header">My Tasks</h1>
    <br>

  <v-data-table
    :headers="headers"
    :items="tasks"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    class="elevation-1"
  >


    <template v-slot:top>
      <v-toolbar
        flat
      >
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
                    ></v-text-field>
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

                    <v-combobox
                      v-model="editedItem.completed"
                      label="Status"
                      :items="['not started', 'in progress', 'done']"
                    ></v-combobox>
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
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
        { title: 'Description', key: 'description', align: 'left', sortable: false },
        { title: 'Status', key: 'completed', align: 'right', sortable: true },
        { title: 'Category', key: 'category', align: 'right', sortable: true },
        { title: '', key: 'actions', align: 'end', sortable: false },
      ],
      tasks: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        description: '',
        completed: '',
      },
      defaultItem: {
        title: '',
        description: '',
        completed: '',
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
    },

    methods: {
      initialize () {
        this.tasks = [
          {
            id: 1,
            title: 'Frozen Yogurt',
            description: 'my first task',
            completed: 'not started',
            category: 'personal',
          },
          {
            id: 2,
            title: 'Task 2',
            description: 'my second task',
            completed: 'in progress',
            category: 'work',

          },
          {
            id: 3,
            title: 'Task 3',
            description: 'my third task',
            completed: 'done',
            category: 'other',
          },
        ]
      },

      editItem (item) {
        let taskToFind = JSON.parse(JSON.stringify(item)).raw
        this.editedIndex = this.tasks.findIndex(task => task.id === taskToFind.id)
        this.editedItem = Object.assign({}, taskToFind)
        this.dialog = true
      },

      deleteItem (item) {
        let taskToFind = JSON.parse(JSON.stringify(item)).raw
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
        else return 'green'
      },
    },
  }
</script>

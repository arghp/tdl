<template>

  <v-container class="section-container">
    <h1 class="section-header">New Task</h1>
    <br>
    <v-form
        ref="newTaskForm"
        v-model="task"
      >
      <v-row>
          <v-col cols="1" align-self="center">
            <v-icon class="icon-color">mdi-lightbulb-on-60</v-icon>
          </v-col>
        <v-col >
          <v-text-field
            v-model="title"
            label="Task title"
            density="compact"
            style="width:360px"
            required
            :rules="[requiredRule]"
          ></v-text-field>
        </v-col>

      </v-row>


      <v-row>

          <v-col cols="1" align-self="center">
            <v-icon class="icon-color">mdi-notebook-edit-outline</v-icon>
          </v-col>
          <v-col>

            <v-textarea
              v-model="description"
              label="Description"
              clearable
              clear-icon="mdi-close-circle"
            >
            </v-textarea>
          </v-col>
        </v-row>

      </v-form>


      <v-row justify="end" style="margin-top: 1em;">
      <v-btn
        class="section-btn"
        type="submit"
        :disabled="!isNewTaskFormValid"
        @click="createTask"
      >
        Create
      </v-btn>
      </v-row>



  </v-container>

</template>

<script>
import { mapActions } from 'vuex';


export default {
  data: () => ({
    task: '',
    title: null,
    description: null,
    requiredRule: (v) => !!v || 'Field is required.',
    newTaskFormValid: false,
  }),
  watch: {
    title: 'validateForm',
  },
  computed: {
    isNewTaskFormValid() {
      return this.newTaskFormValid;
    },
  },
  mounted() {


  },

  methods: {
    ...mapActions([
      'postTask'
    ]),

    async validateForm() {
      let myForm = this.$refs.newTaskForm
      if (myForm) {
        try {
          await myForm.validate();
          const formValidation = JSON.parse(JSON.stringify(myForm))
          this.newTaskFormValid = formValidation.isValid;
          }
          catch (error) {
            console.log('error', error)
            this.newTaskFormValid = false;
        }
      } else {
        this.newTaskFormValid = false;
      }
    },

    createTask: async function() {
      console.log("Title", this.title)
      console.log("Description", this.description)
      let payload = {
        title: this.title,
        description: this.description,
      }
      // ToDo: Remove after testing
      this.$emit('taskCreate', true)       // just for testing until API is working

      await this.postTask(payload)
        .then((data) => {
          console.log(data)
          this.$emit('taskCreate', true)
          }
        )
        .catch((e)=>{
          console.log(e)
          console.log(e.response)
          }
        )

    },
  },
}
</script>


<style>
.section-container{
  border-radius: 12px;
  background-color: #E3E8F0;
  padding: 3em;
}
.section-header{
  color: #5CA277;
}
.section-btn{
  background-color: #5CA277;
}
.icon-color{
  color: #5CA277;
  padding-bottom: 1em;
}

</style>

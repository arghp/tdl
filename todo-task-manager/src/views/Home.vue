<template>
   <div style="height:200vh; background-color:#1C4670 ">
    <v-container  style="margin-top: 3em;">

    <v-row >
      <v-btn
        class="section-btn"
        type="submit"
        @click="addTask"
        :disabled="isAddTask"
      >
        Add Task
      </v-btn>
      </v-row>

    </v-container >

    <v-container v-if="isAddTask"
      style="margin-top: 1em; border-radius: 12px; background-color: #E3E8F0;">

      <AddTask  @taskCreate="newTaskCreated"></AddTask>

    </v-container >

    <v-container  style="margin-top: 3em;">

      <v-card
        id="nav-card"
        class="mx-auto"
        width="320"
        tile
        style="border-radius: 12px; background-color: #E3E8F0;"
      >
        <v-card-title class="text-center" style="margin-top: 0em; color: #278AB0;">MY TASKS</v-card-title>

      </v-card>

    </v-container >

  </div>


</template>

<script>


import AddTask from "@/components/AddTask.vue";

  export default {

    name:'Home',
    components: {
      AddTask,
    },
    data: () => ({
      isAddTask: false,
    }),
    methods: {
      addTask() {
        console.log("Add task")
        this.isAddTask = true
      },
      newTaskCreated(){
        this.isAddTask = false
      },



    },


  };
</script>

<style scoped>


.routerLink{
  text-decoration: none;
}
.home-icon-color{
  color: #278AB0;
}
</style>

<template>
   <div style="height:200vh; background-color:#1C4670 ">

     <v-container
      style="margin-top: 1em; border-radius: 12px; background-color: #E3E8F0;">

      <TaskInfo></TaskInfo>
     </v-container>


  </div>


</template>

<script>


import AddTask from "@/components/AddTask.vue";
import MyTasks  from "@/components/MyTasks";
import TaskInfo from "@/components/TaskInfo";

  export default {

    name:'Home',
    components: {
      AddTask,
      MyTasks,
      TaskInfo
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

<style>


.routerLink{
  text-decoration: none;
}

.section-container{
  border-radius: 12px;
  //background-color: #EAEAE0;
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

.home-icon-color{
  color: #278AB0;
}
</style>

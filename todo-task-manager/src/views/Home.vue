<template>
   <div style="height:100vh; background-color:#1C4670 ">
    <v-container>

        <v-card
          id="nav-card"
          class="mx-auto"
          width="320"
          tile
          style="border-radius: 12px; background-color: #E3E8F0;"
        >
          <v-card-title class="text-center" style="margin-top: 1em; color: #278AB0;">MY TASKS</v-card-title>

        </v-card>


    </v-container >
  </div>


</template>

<script>


  export default {

    name:'Home',
    data: () => ({

    }),
    methods: {

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

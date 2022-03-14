<template>
<div>
<v-alert
      shaped
      outlined
      type="success"
    >
      Thank you for buying!
    </v-alert>

      <div class="text-center">
    <v-btn
      rounded
      color="primary"
      dark
      to="/"
    >
      Back to Items
    </v-btn>
  </div>
</div>

</template>

<script>
export default {
data: () => ({ 
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home', link: "/" },
      ],
    }),

}
</script>

<style>
</style>
<template>
  <b-container class="dog wrapper">
    <b-row>
      <b-col>This is the sub page from dogs -> {{$route.params.dog}} page</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "dog"
};
</script>
<style lang="scss" scoped>

</style>

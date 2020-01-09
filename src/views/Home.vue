<template>
  <div class="home">
    <img class="sally-img" src="@/assets/sally.jpg" alt="Hunden Sally" />
    <b-container class="wrapper">
      <b-row>
        <b-col>col1</b-col>
      </b-row>
      <b-row>
        <b-col>col2</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
.home {
  .sally-img {
    width: 100%;
    height: auto;
    background-color: #6d962b;
  }
}
</style>
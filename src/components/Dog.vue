<template>
  <div class="dog">
    <b-row>
      <b-col cols="12" md="6">
        <img :src="dog.image" class="dog-image" alt="hundbild" />
      </b-col>
      <b-col cols="12" md="6">
        <p>{{dog.name}}</p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: `dogComponent`,
  props: ["dog"]
};
</script>
<style lang="scss" scoped>
.dog {
  .dog-image {
    width: 100%;
    height: auto;
  }
}
</style>
<template>
  <b-container fluid @click="redirectToDogPage" class="dog-preview">
    <b-row class="p-2">
      <b-col cols="4" class="p-0 border-bottom">
        <figure>
          <img :src="dog.image" />
        </figure>
      </b-col>
      <b-col cols="8" class="border-bottom">
        <h3>{{dog.name}}</h3>
        <p>Ras: {{dog.breed}}</p>
        <p>Född: {{new Date(dog.dateOfBirth).toLocaleString('sv-SE', {year: 'numeric', month: 'numeric'})}}</p>
      </b-col>
    </b-row>
    <b-row v-for="link in dog.links" :key="link.id" class="p-2 border-bottom">
      <b-col cols="2">
        <img :src="link.image" alt="länkbild" />
      </b-col>
      <b-col cols="10">
        <p class="font-weight-bold">{{link.name}}</p>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "dogPreview",
  props: ["dog"],
  methods: {
    redirectToDogPage() {
      this.$router.push("/hundarna/" + this.dog.link);
    }
  }
};
</script>
<style lang="scss" scoped>
.dog-preview {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  &:active {
    box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    height: auto;
  }
  p {
    margin: 0;
  }
}
</style>
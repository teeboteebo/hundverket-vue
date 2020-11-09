<template>
  <b-container class="dogs wrapper">
    <b-row>
      <b-col cols="12">
        <h2 class="text-center">Hundarna</h2>
        <div class="border-bottom mb-3" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6" class="mt-4 mt-md-0" v-for="dog in state.dogs" :key="dog._id">
        <DogPreview :dog="dog" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import DogPreview from "../components/DogPreview";
export default {
  name: "dogs",
  components: {
    DogPreview
  },
  data() {
    return {
      state: {
        dogs: ""
      }
    };
  },
  beforeMount() {
    this.getDogs();
  },
  methods: {
    async getDogs() {
      const dogs = await axios({
        method: "GET",
        url: "https://api.hundverketiskane.se/api/dogs"
      });
      this.state.dogs = dogs.data;
    }
  }
};
</script>
<style lang="scss" scoped></style>

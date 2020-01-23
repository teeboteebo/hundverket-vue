<template>
  <b-container class="dogs wrapper">
    <b-row>
      <b-col cols="6" v-for="dog in state.dogs" :key="dog._id">
        <DogPreview :dog="dog" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import DogPreview from "../components/DogPreview"
export default {
  name: "dogs",
  components: {
    DogPreview
  },
  data() {
    return {
      state: {
        dogs: ''
      }
    }
  },
  beforeMount() {
    this.getDogs()
  },
  methods: {
    async getDogs() {
      const dogs = await axios({
        method: 'GET',
        url: '/api/dogs'
      })
      this.state.dogs = dogs.data
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

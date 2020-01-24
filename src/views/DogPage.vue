<template>
  <Loader v-if="state.loading" />
  <b-container v-else-if="state.dog._id" class="dog-wrapper bg-white py-5 p-lg-5">
    <Dog v-if="!state.edit" :dog="this.state.dog" />
    <EditDog v-else-if="state.edit" :edit="state.edit" :toggleEdit="toggleEdit" :dog="state.dog" />
    <div v-if="loggedIn" class="text-right">
      <button
        @click="toggleEdit"
        class="btn my-3 edit-btn"
        :class="state.edit ? 'btn-danger' : 'btn-info'"
      >
        <span v-if="state.edit">Avbryt</span>
        <span v-else>Redigera</span>
      </button>
    </div>
  </b-container>
  <MissingPage v-else />

  <!-- <b-container v-if="dog" class="dog-page wrapper">
    <b-spinner v-if="loading" />
    <Dog :dog="dog" v-else />    
  </b-container>
  <MissingPage v-else />-->
</template>

<script>
import axios from "axios";
import MissingPage from "./MissingPage";
import EditDog from "../components/EditDog";
import Dog from "../components/Dog";
import Loader from "../components/Loader";
export default {
  name: "dogPage",
  components: {
    MissingPage,
    Dog,
    EditDog,
    Loader
  },
  async beforeMount() {
    await this.$store.dispatch("checkIfLoggedIn");
    this.getDogData();
  },
  data() {
    return {
      state: {
        loading: false,
        dog: {},
        edit: false
      }
    };
  },
  methods: {
    async getDogData() {
      this.state.loading = true;
      const dog = await axios({
        method: "GET",
        url: `/api/dogs/${this.$route.params.dog}`
      });
      this.state.loading = false;
      this.state.dog = dog.data;
    },
    toggleEdit(event, dog) {
      if (dog) {
        console.log("dog: ", dog);

        this.state.edit = false;
        this.state.dog = dog;
      } else {
        this.state.edit = !this.state.edit;
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/bootstrap";
.dog-wrapper {
  .edit-btn {
    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }
}
</style>

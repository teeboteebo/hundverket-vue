<template>
  <b-container v-if="loggedIn" class="new-dog wrapper">
    <b-row>
      <b-col>
        <EditDog :edit="false" />
      </b-col>
    </b-row>
  </b-container>
  <MissingPage v-else />
</template>

<script>
import MissingPage from "./MissingPage";
import EditDog from "../components/EditDog";
export default {
  name: "newDog",
  components: {
    MissingPage,
    EditDog
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  beforeMount() {
    this.$store.dispatch("checkIfLoggedIn");
  }
};
</script>
<style lang="scss" scoped>
.new-dog {
}
</style>

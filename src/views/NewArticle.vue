<template>
  <b-container v-if="loggedIn" class="new-article wrapper">
    <b-row>
      <b-col>
        <EditArticle :edit="false" />
      </b-col>
    </b-row>
  </b-container>
  <MissingPage v-else />
</template>

<script>
import EditArticle from "../components/EditArticle";
import MissingPage from "../views/MissingPage";
export default {
  name: "newArticle",
  components: {
    EditArticle,
    MissingPage
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
.new-article {
}
</style>

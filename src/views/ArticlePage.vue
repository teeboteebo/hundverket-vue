<template>
  <Loader v-if="this.state.loading"/>
  <b-container v-else-if="this.state.article._id" class="wrapper article-page">
    {{this.state.article.headline}}
    <br />
    {{this.state.article.image}}
    <br />
    {{this.state.article.body}}
  </b-container>
  <MissingPage v-else />
</template>
<script>
import axios from "axios";
import MissingPage from '../views/MissingPage'
import Loader from '../components/Loader'
export default {
  name: "articlepage",
  components: {MissingPage, Loader},
  data() {
    return {
      state: {
        loading: true,
        article: {},
        loggedIn: false
      }
    };
  },
  async beforeMount() {
    await this.checkIfLoggedIn();
    if (this.state.loggedIn) {
      const article = await axios({
        method: "GET",
        url: `/api/articles/${this.$route.params.link}`
      });
      this.state.article = article.data;
      this.state.loading = false
    } else {
      const article = await axios({
        method: "GET",
        url: `/api/articles/published/${this.$route.params.link}`
      });
      this.state.article = article.data;
      this.state.loading = false
    }
  },
  methods: {
    async checkIfLoggedIn() {
      let response = await axios({
        method: "GET",
        url: "/api/login"
      });
      if (response.data._id) {
        this.state.loggedIn = response.data;
      } else this.state.loggedIn = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.article-page {
  color: red;
}
</style>
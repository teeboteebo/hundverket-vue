<template>
  <Loader v-if="this.state.loading" />
  <b-container v-else-if="this.state.article._id" class="wrapper">
    <div v-if="this.state.loggedIn" class="text-right">
      <button @click="toggleEdit" class="btn" :class="this.state.edit ? 'btn-danger' : 'btn-info'">
        <span v-if="this.state.edit">Avbryt</span>
        <span v-else>Redigera</span>
      </button>
    </div>
    <Article v-if="!this.state.edit" :articleData="this.state.article" />
    <EditArticle
      v-else-if="this.state.edit"
      :edit="this.state.edit"
      :toggleEdit="toggleEdit"
      :article="this.state.article"
    />
    <!-- <EditArticle v-if="this.state.edit" :articleData="this.state.article" /> -->
  </b-container>
  <MissingPage v-else />
</template>
<script>
import axios from "axios";
import MissingPage from "../views/MissingPage";
import Loader from "../components/Loader";
import Article from "../components/Article";
import EditArticle from "../components/EditArticle";
export default {
  name: "articlepage",
  components: { MissingPage, Loader, Article, EditArticle },
  data() {
    return {
      state: {
        loading: true,
        article: {},
        loggedIn: false,
        edit: false
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
      this.state.loading = false;
    } else {
      const article = await axios({
        method: "GET",
        url: `/api/articles/published/${this.$route.params.link}`
      });
      this.state.article = article.data;
      this.state.loading = false;
    }
  },
  methods: {
    toggleEdit(event, article) {
      if (article) {
        this.state.edit = false;
        this.state.article.headline = article.headline;
        this.state.article.image = article.image;
        this.state.article.body = article.body;
      } else {
        this.state.edit = !this.state.edit;
      }
    },
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
</style>
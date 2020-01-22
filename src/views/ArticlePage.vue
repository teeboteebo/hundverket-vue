<template>
  <Loader v-if="state.loading" />
  <div v-else-if="this.state.article._id" class="article-wrapper">
    <div class="article-image-bg">
      <div class="bg-blur-image" :style="{backgroundImage: `url(${state.article.image})`}" />
      <div class="image-holder">
        <img class="article-image" :src="state.article.image" alt="Inläggsbild" />
      </div>
    </div>
    <b-container class="content-wrapper bg-white py-5">
      <Article v-if="!this.state.edit" :articleData="this.state.article" />
      <EditArticle
        v-else-if="this.state.edit"
        :edit="this.state.edit"
        :toggleEdit="toggleEdit"
        :article="this.state.article"
      />
      <div v-if="loggedIn" class="text-right">
        <button
          @click="toggleEdit"
          class="btn my-3 edit-btn"
          :class="this.state.edit ? 'btn-danger' : 'btn-info'"
        >
          <span v-if="this.state.edit">Avbryt</span>
          <span v-else>Redigera</span>
        </button>
      </div>
      <!-- <EditArticle v-if="this.state.edit" :articleData="this.state.article" /> -->
    </b-container>
  </div>
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
        edit: false
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  async beforeMount() {
    await this.$store.dispatch("checkIfLoggedIn");
    if (this.loggedIn) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../scss/bootstrap";
.article-wrapper {
  width: 100%;
  .article-image-bg {
    position: relative;
    background-size: cover;
    background-position: center center;
    z-index: 10;

    background-repeat: no-repeat;
    height: 60vh;
    .image-holder {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 10;
      text-align: center;
      display: flex;
      align-items: center;
      .article-image {
        display: inline-block;
        width: auto;
        height: 100%;
        margin: 0 auto;
      }
    }
    .bg-blur-image {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 5;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      filter: blur(2px);
    }
  }
  .content-wrapper {
    margin-top: -5px;
    .edit-btn {
      @include media-breakpoint-down(md) {
        width: 100%;
      }
    }
  }
}
</style>
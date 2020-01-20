<template>
  <div class="home">
    <img class="sally-img" src="@/assets/sally.jpg" alt="Hunden Sally" />
    <b-container class="wrapper">
      <b-row>
        <b-col cols="12" md="6" lg="8" class="">
          <ArticleLister :articles="state.articles" />
        </b-col>
        <b-col cols="12" md="6" lg="4">
          <div
            class="fb-page"
            data-href="https://www.facebook.com/hundverketiskane/"
            data-tabs="timeline"
            data-width="500px"
            data-height="1000px"
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/hundverketiskane/"
              class="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/hundverketiskane/">Hundverket i Skåne</a>
            </blockquote>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import ArticleLister from "../components/ArticleLister";
export default {
  name: "home",
  components: {
    ArticleLister
  },
  data() {
    return {
      state: {
        page: 1,
        articles: [],
        currAmtArticles: 0,
      }
    }
  },
  beforeMount() {
    this.getArticles()
  },
  methods: {
    async getArticles(page = this.state.page) {
      let articles = await axios({
        method: "GET",
        url: `/api/articles/published?page=${page}`
      });
      this.state.articles = articles.data;
      this.state.currAmtArticles = articles.data.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .sally-img {
    width: 100%;
    height: auto;
    background-color: #6d962b;
  }
}
</style>
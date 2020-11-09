<template>
  <div class="home">
    <img class="sally-img" src="/images/sally.webp" alt="Hunden Sally" />
    <b-container class="wrapper">
      <b-row>
        <b-col cols="12" lg="8" class="articles">
          <div v-if="state.articles[0]" class="border-bottom mb-4 pb-4">
            <Article :articleData="state.articles[0]" />
            <img
              alt="inläggsbild"
              :src="state.articles[0].image"
              class="first-article-img border rounded mb-3"
            />
            <br />
            <router-link :to="'/inlagg/' + state.articles[0].link">Gå till inlägg</router-link>
          </div>
          <h2 class="mb-3">Senaste inläggen</h2>

          <ArticleLister :articles="state.articles.slice(1)" />
          <button
            v-if="state.amount < state.totalAmtArticles"
            @click="loadMoreArticles"
            class="btn btn-outline btn-outline-primary"
          >Visa fler</button>
        </b-col>
        <b-col cols="12" lg="4" class="text-center mt-5 mt-lg-0">
          <div
            class="fb-page"
            data-href="https://www.facebook.com/hundverketiskane/"
            data-tabs="timeline"
            data-width="350px"
            data-height="800px"
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
import Article from "../components/Article";
export default {
  name: "home",
  components: {
    ArticleLister,
    Article
  },
  data() {
    return {
      state: {
        articles: [],
        amount: 5,
        totalAmtArticles: 0
      }
    };
  },
  beforeMount() {
    this.getArticles();
  },
  methods: {
    loadMoreArticles() {
      this.state.amount = this.state.amount + 5;
      this.getArticles();
    },
    async getArticles(amount = this.state.amount) {
      let articles = await axios({
        method: "GET",
        url: `https://api.hundverketiskane.se/api/articles/published?amount=${amount}`
      });
      this.state.articles = articles.data.allArticles; // Requested articles
      this.state.totalAmtArticles = articles.data.total; // Amount of articles possible to get
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/bootstrap";
.home {
  .sally-img {
    width: 100%;
    height: auto;
    background-color: #6d962b;
  }
  .articles {
    @include media-breakpoint-up(lg) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    .first-article-img {
      width: 100%;
      height: auto;
      @include media-breakpoint-up(md) {
        width: 50%;
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <img class="sally-img" src="@/assets/sally.jpg" alt="Hunden Sally" />
    <b-container class="wrapper">
      <b-row>
        <b-col cols="12" lg="8" class="articles">
          <ArticleLister :articles="state.articles" />
          <button v-if="state.amount < state.totalAmtArticles" @click="loadMoreArticles" class="btn btn-outline btn-outline-primary">Visa fler</button>
        </b-col>
        <b-col cols="12" lg="4" class="text-center mt-5 mt-lg-0">
          <div
            class="fb-page"
            data-href="https://www.facebook.com/hundverketiskane/"
            data-tabs="timeline"
            data-width="500px"
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
export default {
  name: "home",
  components: {
    ArticleLister
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
        url: `/api/articles/published?amount=${amount}`
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
  }
}
</style>
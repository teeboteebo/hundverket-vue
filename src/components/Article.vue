<template>
  <div class="article">
    <!-- <b-row>
      <b-col>
        <img class="article-image" :src="articleData.image" alt="inläggsbild" />
      </b-col>
    </b-row>-->
    <b-row class="article-header">
      <b-col>
        <h2>{{ articleData.headline }}</h2>
        <p>
          {{
            new Date(articleData.created).toLocaleString("sv-SE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            })
          }}
        </p>
      </b-col>
    </b-row>
    <b-row class="article-body py-4">
      <b-col>
        <div class="body-content" v-html="articleData.body" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "articleComponent",
  props: ["articleData"]
};
</script>
<style lang="scss">
.article {
  .article-image {
    width: 100%;
    height: auto;
  }
  .article-header {
    h2 {
      font-weight: bold;
      font-size: 2.5rem;
    }
  }
  .article-body {
    .body-content {
      ol,
      ul {
        margin-left: 1rem !important;
      }
    }
  }
}
</style>

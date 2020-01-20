<template>
  <div class="article">
    <b-row class="article-header">
      <b-col>
        <h2>{{articleData.headline}}</h2>
        {{articleData.image}}
      </b-col>
    </b-row>
    <b-row class="article-body">
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
}
</script>
<style lang="scss">
.article {
  .article-header {}
  .article-body {
    .body-content {
      ol, ul {
        margin-left: 1rem !important;
      }
    }
  }
}
</style>
<template>
  <b-row class="article-preview mb-4" @click="openArticle(article.link)">

    {{article.headline + (article.publishedAt ? ", " + new Date(article.publishedAt).toLocaleString('sv-SE', {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"}) : '') }}
  </b-row>
</template>
<script>
export default {
  name:"articlePreview",
  props: ["article"],
  methods: {
    openArticle(link) {
      this.$router.push("/inlagg/" +link)
    }
  }
}
</script>
<style lang="scss" scoped>
.article-preview {
  background-color: #fff;
  min-height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &:hover {
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}
</style>

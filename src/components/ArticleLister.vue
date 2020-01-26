<template>
  <b-container fluid class="article-lister">
    <ArticlePreview
      v-for="article in articles"
      :key="article._id"
      :article="article"
      class="mb-4"
    />
  </b-container>
</template>
<script>
import ArticlePreview from "./ArticlePreview";

export default {
  name: "articleLister",
  props: ["articles"],
  components: {
    ArticlePreview
  }
};
</script>
<style lang="scss" scoped></style>

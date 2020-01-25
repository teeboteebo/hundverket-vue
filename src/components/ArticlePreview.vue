<template>
  <b-row class="article-preview mb-4" @click="openArticle(article.link)">
    <b-col cols="12" md="4" class="p-2 image-holder">
      <div
        class="preview-image"
        :style="{ backgroundImage: `url(${article.image}` }"
      />
      <!-- <img :src="article.image" class="preview-image" alt="inläggsbild" /> -->
    </b-col>
    <b-col cols="12" md="8" class="p-2 preview-content">
      <h3 class="content-headline">{{ article.headline }}</h3>
      <p class="content-body">
        {{
          article.summary.length > 260
            ? article.summary.slice(0, 260) + "..."
            : article.summary
        }}
      </p>
      <p class="content-date">
        {{
          new Date(article.created).toLocaleString("sv-SE", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          })
        }}
      </p>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "articlePreview",
  props: ["article"],
  methods: {
    openArticle(link) {
      this.$router.push("/inlagg/" + link);
    }
  }
};
</script>
<style lang="scss" scoped>
.article-preview {
  background-color: #fff;
  min-height: 220px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &:hover {
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  &:active {
    box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.1);
  }
  .image-holder {
    min-height: 200px;
    .preview-image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .preview-content {
    max-height: 100%;

    display: flex;
    flex-direction: column;
    .content-headline {
      margin-bottom: 1rem;
    }
    .content-body {
      flex: 1;
    }
    .content-date {
      text-align: right;
      margin: 0;
      // font-style: italic;
      opacity: 0.8;
      font-size: 0.8rem;
    }
  }
}
</style>

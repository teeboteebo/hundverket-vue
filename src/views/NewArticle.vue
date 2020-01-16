<template>
  <b-container class="new-article wrapper">
    <b-row>
      <b-col>
        <EditArticle :edit="false" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditArticle from "../components/EditArticle"
export default {
  name: "newArticle",
  components: {
    EditArticle
  }
};
</script>
<style lang="scss" scoped>
.new-article {
  
}
</style>

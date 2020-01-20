<template>
  <div class="home">
    <img class="sally-img" src="@/assets/sally.jpg" alt="Hunden Sally" />
    <b-container class="wrapper">
      <b-row>
        <b-col cols="12" md="6" lg="8" class="border border-dark">col1</b-col>
        <b-col cols="12" md="6" lg="4">
          <div
            class="fb-page"
            data-href="https://www.facebook.com/hundverketiskane/"
            data-tabs="timeline"
            data-width="500"
            data-height
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
export default {
  name: "home",
  components: {}
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
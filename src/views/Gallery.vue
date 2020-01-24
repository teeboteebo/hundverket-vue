<template>
  <b-container class="gallery wrapper">
    <b-row>
      <b-col>
        <div class="images">
          <div
            @click="redirectUserTo(image.link)"
            class="img-wrapper"
            :style="{backgroundImage: `url(${image.images[0].source})`}"
            v-for="image in images"
            :key="'img_'+ image.images[0].source"
          >
            <div class="img-overlay" v-if="image.name">
              <p
                class="img-time"
              >{{new Date(image.created_time).toLocaleString('sv-SE',{year: 'numeric', month: 'numeric', day:'numeric'})}}</p>
              <p class="img-name">{{image.name}}</p>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "gallery",
  data() {
    return {
      images: []
    };
  },
  async beforeMount() {
    const response = await axios({
      method: "GET",
      url: "/api/photos"
    })
    this.images = response.data;
  },
  methods: {
    redirectUserTo(url) {      
      var win = window.open(url, "_blank");
      win.focus();
    }
  }

};
</script>
<style lang="scss" scoped>
@import "@/scss/bootstrap";
.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .img-wrapper {
    cursor: pointer;
    margin-bottom: 0.5rem;
    min-width: 150px;
    max-width: 150px;
    height: 150px;
    @media screen and (max-width: 350px) {
      min-width: 129px;
      max-width: 129px;
      height: 129px;
    }
    @include media-breakpoint-up(sm) {
      min-width: 200px;
      max-width: 200px;
      height: 200px;
    }
    @include media-breakpoint-up(md) {
      min-width: 300px;
      max-width: 300px;
      height: 300px;
    }
    @include media-breakpoint-up(xl) {
      min-width: 350px;
      max-width: 350px;
      height: 350px;
    }
    background-position: center center;
    background-size: cover;
    position: relative;
    display: inline-block;
    flex: 1;
    .img-overlay {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.7;
      background-color: #000;
      color: white;
      align-items: flex-end;
      .img-name {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding: 0.5rem;

        margin-bottom: 0;
        font-size: 0.9rem;
        font-weight: bold;
        @include media-breakpoint-down(xs) {
          font-size: 0.7rem;
          font-weight: normal;
        }
      }
      .img-time {
        position: absolute;
        top: 0;
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        font-weight: bold;
        @include media-breakpoint-down(xs) {
          font-size: 0.7rem;
          font-weight: normal;
        }
      }
    }
    &:hover {
      .img-overlay {
        display: block;
      }
    }
  }
}
</style>

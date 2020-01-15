<template>
  <b-container class="new-article wrapper">
    <b-row>
      <b-col>
        <form class="article-form">
          <b-row>
            <b-col cols="12" md="6">
              <div class="input-grp">
                <label for="Rubrik">Rubrik</label>
                <input name="Rubrik" type="text" class="input-field" v-model="form.headline" />
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="input-grp">
                <label for="Bild">Bild</label>
                <input name="Bild" type="text" class="input-field" v-model="form.image" />
              </div>
            </b-col>
          </b-row>
          <div class="input-grp">
            <label for="Innehåll">Innehåll</label>
            <textarea
              name="Innehåll"
              rows="10"
              type="text"
              class="input-field"
              v-model="form.body"
            />
          </div>
          <div class="input-grp">
            <button @click="cancelArticle" class="btn btn-danger mt-3">Avbryt</button>
            <div class="continue-btns">
              <button @click="submitArticle" class="btn btn-info mt-3">Spara</button>
              <button @click="submitAndPublishArticle" class="btn btn-primary ml-md-3 mt-3">Spara och publicera</button>
            </div>
          </div>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "newArticle",
  data() {
    return {
      form: {
        headline: "",
        image: "",
        body: ""
      }
    };
  },
  methods: {
    cancelArticle(e) {
      e.preventDefault();      
      this.$router.go(-1);
    },
    async submitArticle(e) {
      const { headline, image, body } = this.form;
      e.preventDefault();
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      await axios({
        method: "POST",
        url: "/api/articles",
        data: {
          link,
          headline,
          image,
          body
        }
      });
      this.$router.push('/admin');
    },
    async submitAndPublishArticle(e) {
      const { headline, image, body } = this.form;
      e.preventDefault();
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      let response = await axios({
        method: "POST",
        url: "/api/articles",
        data: {
          link,
          headline,
          image,
          body,
          published: true
        }
      });
      this.$router.push('/inlagg/' + response.data.link)
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/bootstrap";
.new-article {
  .article-form {
    .input-grp {
      .input-field {
        display: block;
        width: 100%;
        padding: 6px;
        border-radius: 4px;
        margin-bottom: 20px;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
      .continue-btns {
        display: inline-block;
        float: right;
        @include media-breakpoint-down(md) {
          width: 100%;
        }
      }
      button {
        @include media-breakpoint-down(md) {
          width: 100%;
        }
      }
    }
  }
}
</style>

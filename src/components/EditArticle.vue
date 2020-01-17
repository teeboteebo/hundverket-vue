<template>
  <form class="article-form">
    <h2 v-if="edit">Redigera inlägg</h2>
    <h2 v-else>Nytt inlägg</h2>
    <b-row class="mt-5">
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Rubrik">Rubrik</label>
          <input required name="Rubrik" type="text" class="input-field" v-model="form.headline" />
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Bild">Bild</label>
          <b-form-file v-model="form.image" class plain></b-form-file>
          <button @click="form.image = null" class="btn btn-danger mt-2 max-w-50">Återställ bild</button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="input-grp">
          <label for="Innehåll">Innehåll</label>
          <ckeditor name="Innehåll" :editor="editor" v-model="editorData" :config="editorConfig" />
        </div>
      </b-col>
    </b-row>
    <div v-if="!edit" class="input-grp">
      <button @click="cancelArticle" class="btn btn-danger mt-3">Avbryt</button>
      <div class="continue-btns">
        <button @click="submitArticle" class="btn btn-info mt-3">Spara</button>
        <button
          @click="submitAndPublishArticle"
          class="btn btn-primary ml-lg-3 mt-3"
        >Spara och publicera</button>
      </div>
    </div>
    <div v-else class="input-grp">
      <div class="continue-btns">
        <button @click="saveArticle" class="btn btn-info mt-3">Spara</button>
      </div>
    </div>
  </form>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
export default {
  name: "editArticle",
  props: ["toggleEdit", "article", "edit"],
  data() {
    return {
      form: {
        headline: "",
        image: ""
      },
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  updated() {
    console.log(this.editorData);
  },
  beforeMount() {
    if (this.edit) {
      this.setDefaultValues();
    } else {
      return;
    }
  },
  methods: {
    setDefaultValues() {
      this.form = {
        headline: this.article.headline,
        image: this.article.image
      };
      this.editorData = this.article.body;
    },
    cancelArticle(e) {
      e.preventDefault();
      this.$router.go(-1);
    },
    async saveArticle(e) {
      e.preventDefault();
      const { headline, image } = this.form;
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      await axios({
        method: "PUT",
        url: `/api/articles/${this.article.link}/edit`,
        data: {
          headline,
          link,
          image,
          body: this.editorData
        }
      });
      history.pushState({}, null, "/inlagg/" + encodeURIComponent(link));
      const article = {
        headline,
        link,
        image,
        body: this.editorData
      };
      this.toggleEdit("toggleEdit", article);
    },
    async submitArticle(e) {
      const { headline, image } = this.form;
      e.preventDefault();
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      await axios({
        method: "POST",
        url: "/api/articles",
        data: {
          link,
          headline,
          image,
          body: this.editorData
        }
      });
      this.$router.push("/admin");
    },
    async submitAndPublishArticle(e) {
      const { headline, image } = this.form;
      e.preventDefault();
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      let response = await axios({
        method: "POST",
        url: "/api/articles",
        data: {
          link,
          headline,
          image,
          body: this.editorData,
          published: true
        }
      });
      this.$router.push("/inlagg/" + response.data.link);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/bootstrap";

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
</style>
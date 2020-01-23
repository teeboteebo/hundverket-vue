<template>
  <form class="dog-form pt-4">
    <h2 v-if="edit">Redigera hund</h2>
    <h2 v-else>Ny hund</h2>
    <b-row class="mt-5">
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Namn">Namn</label>
          <input name="Namn" type="text" class="input-field" v-model="form.name" />
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Bild">Bild *</label>
          <input name="Bild" type="text" class="input-field" v-model="form.image" />
          <p
            :style="{fontStyle: 'italic', opacity: .8, fontSize: '.8rem'}"
          >* Högerklicka på önskad bild och välj "kopiera bildadress". Klistra in länken i fältet ovan.</p>

          <img v-if="form.image" :src="form.image" class="mb-4" width="150px" />
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Ras">Ras</label>
          <input name="Ras" type="text" class="input-field" v-model="form.breed" />
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Födelsedatum">Födelsedatum</label>
          <input name="Födelsedatum" type="date" class="input-field" v-model="form.dateOfBirth" />
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col cols="12">
        <div class="input-grp">
          <label for="Innehåll">Innehåll</label>
          <textarea name="Innehåll" rows="6" class="input-field" v-model="form.desc" />
        </div>
      </b-col>
      <b-col cols="12">
        <div class="input-grp links">
          <label for="Links">Länkar</label>

          <div class="ml-3 mb-4 border-bottom" v-for="link in form.links" :key="link.id">
            <div class="input-grp">
              <p>Länk {{link.id + 1}}</p>
              <label for="linkNamn">Namn</label>
              <input
                name="linkNamn"
                type="text"
                class="input-field"
                v-model="form.links[link.id].name"
              />
              <label for="linkLink">Länk</label>
              <input
                name="linkLink"
                type="text"
                class="input-field"
                v-model="form.links[link.id].link"
              />
              <label for="linkBild">Bild *</label>
              <input
                name="linkBild"
                type="text"
                class="input-field"
                v-model="form.links[link.id].image"
              />
              <p
                :style="{fontStyle: 'italic', opacity: .8, fontSize: '.8rem'}"
              >* Högerklicka på önskad bild och välj "kopiera bildadress". Klistra in länken i fältet ovan.</p>

              <img
                v-if="form.links[link.id].image"
                :src="form.links[link.id].image"
                class="mb-4"
                width="150px"
              />
              <label for="linkInfo">Information</label>
              <textarea
                name="linkInfo"
                rows="3"
                class="input-field"
                v-model="form.links[link.id].info"
              />
            </div>
          </div>
          <button @click="addLink" class="ml-3 mt-2 btn btn-info">Lägg till länk +</button>
        </div>
      </b-col>
    </b-row>

    <div v-if="!edit" class="input-grp">
      <button @click="cancelDog" class="btn btn-danger mt-3">Avbryt</button>
      <div class="continue-btns">
        <button @click="submitDog" class="btn btn-info mt-3">Spara</button>
        <button
          @click="submitAndPublishDog"
          class="btn btn-primary ml-lg-3 mt-3"
        >Spara och publicera</button>
      </div>
    </div>
    <div v-else class="input-grp">
      <div class="continue-btns">
        <button @click="saveDog" class="btn btn-info mt-3">Spara</button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "editDog",
  props: ["toggleEdit", "dog", "edit"],
  updated() {
    console.log(this.form.links[this.form.links.length - 1]);
  },
  data() {
    return {
      form: {
        link: "",
        breed: "",
        name: "",
        desc: "",
        image: "",
        links: [
          {
            link: "",
            name: "",
            image: "",
            info: "",
            id: 0
          }
        ],
        dateOfBirth: ""
      }
    };
  },
  beforeMount() {
    if (this.edit) {
      this.setDefaultValues();
    } else {
      return;
    }
  },
  methods: {
    addLink(e) {
      e.preventDefault();
      this.form.links.push({
        link: "",
        name: "",
        image: "",
        info: "",
        id: this.form.links.length
      });
    },
    removeHTML() {
      let body = this.editorData;
      let result = body.replace(/(<([^>]+)>)/gi, "");
      result = result.replace(/[&]nbsp[;]/gi, " "); // removes all occurrences of &nbsp;
      return result;
    },
    setDefaultValues() {
      this.form = {
        headline: this.dog.headline,
        image: this.dog.image,
        summary: this.dog.summary
      };
      this.editorData = this.dog.body;
    },
    canceldog(e) {
      e.preventDefault();
      this.$router.go(-1);
    },
    async saveDog(e) {
      e.preventDefault();
      const { headline, image } = this.form;
      const summary = this.removeHTML();
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      await axios({
        method: "PUT",
        url: `/api/dogs/${this.dog.link}/edit`,
        data: {
          headline,
          link,
          image,
          summary,
          body: this.editorData
        }
      });
      history.pushState({}, null, "/hundarna/" + encodeURIComponent(link));
      const dog = {
        headline,
        link,
        image,
        body: this.editorData
      };
      this.toggleEdit("toggleEdit", dog);
    },
    async submitDog(e) {
      const { headline, image } = this.form;
      const summary = this.removeHTML();
      e.preventDefault();
      let link = this.form.headline.replace(/\s+/g, "-").toLowerCase(); //convert headline into a link-friendly format
      await axios({
        method: "POST",
        url: "/api/dogs",
        data: {
          link,
          headline,
          image,
          summary,
          body: this.editorData
        }
      });
      this.$router.push("/admin");
    },
    async submitAndPublishDog(e) {
      console.log(this.form);
      this.form.link = this.form.name.toLowerCase()
      e.preventDefault();
      let response = await axios({
        method: "POST",
        url: "/api/dogs",
        data: this.form
      });
      this.$router.push("/hundarna/" + response.data.link);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/bootstrap";

.dog-form {
  .input-grp {
    label {
      font-weight: bold;
      display: block;
    }
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
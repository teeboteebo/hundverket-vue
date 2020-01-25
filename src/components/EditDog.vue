<template>
  <form class="dog-form pt-4">
    <h2 v-if="edit">Redigera hund</h2>
    <h2 v-else>Ny hund</h2>
    <b-row class="mt-5">
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Namn">Namn</label>
          <input
            name="Namn"
            type="text"
            class="input-field"
            v-model="form.name"
          />
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Bild">Bild</label>
          <input
            placeholder="Ange URL *, för bäst resultat väl en kvadratisk bild"
            name="Bild"
            type="text"
            class="input-field"
            v-model="form.image"
          />
          <p
            :style="{ fontStyle: 'italic', opacity: 0.8, fontSize: '.8rem' }"
            v-if="!form.image"
          >
            * Högerklicka på önskad bild och välj "kopiera bildadress". Klistra
            in länken i fältet ovan.
          </p>

          <img v-if="form.image" :src="form.image" class="mb-4" width="150px" />
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Ras">Ras</label>
          <input
            name="Ras"
            type="text"
            class="input-field"
            v-model="form.breed"
          />
        </div>
      </b-col>
      <b-col cols="12" md="6">
        <div class="input-grp">
          <label for="Födelsedatum">Födelsedatum</label>
          <input
            name="Födelsedatum"
            type="date"
            class="input-field"
            v-model="form.dateOfBirth"
          />
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col cols="12">
        <p class="font-weight-bold">Innehåll</p>
        <div
          class="input-grp p-2 border rounded mt-2"
          v-for="(desc, index) in form.desc"
          :style="{ boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.1)' }"
          :key="'paragraph_' + index"
        >
          <label class="font-weight-normal" :for="'Stycke' + index"
            >Stycke {{ index + 1 }}</label
          >
          <textarea
            :name="'Stycke' + index"
            rows="3"
            class="input-field"
            v-model="form.desc[index]"
          />
          <button
            class="btn btn-outline-danger mb-2"
            @click="
              e => {
                e.preventDefault();
                removeParagraph(index);
              }
            "
          >
            Ta bort stycke {{ index + 1 }}
          </button>
        </div>
        <button @click="addParagraph" class="mt-3 mb-5 btn btn-outline-info">
          Nytt stycke +
        </button>
      </b-col>
      <b-col cols="12">
        <div class="input-grp links">
          <p class="font-weight-bold">Länkar</p>
          <div
            class="p-2 border rounded mt-2"
            v-for="(link, index) in form.links"
            :key="'link_' + index"
            :style="{ boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.1)' }"
          >
            <div class="input-grp">
              <p>Länk {{ index + 1 }}</p>
              <label for="linkNamn">Namn</label>
              <input
                name="linkNamn"
                type="text"
                class="input-field"
                v-model="form.links[index].name"
              />
              <label for="linkLink">Länk</label>
              <input
                name="linkLink"
                type="text"
                class="input-field"
                v-model="form.links[index].link"
              />
              <label for="linkBild">Bild</label>
              <input
                placeholder="Ange URL *"
                name="linkBild"
                type="text"
                class="input-field"
                v-model="form.links[index].image"
              />
              <p
                :style="{
                  fontStyle: 'italic',
                  opacity: 0.8,
                  fontSize: '.8rem'
                }"
                v-if="!form.links[index].image"
              >
                * Högerklicka på önskad bild och välj "kopiera bildadress".
                Klistra in länken i fältet ovan.
              </p>

              <img
                v-if="form.links[index].image"
                :src="form.links[index].image"
                class="mb-4"
                width="150px"
              />
              <label for="linkInfo">Information</label>
              <textarea
                name="linkInfo"
                rows="3"
                class="input-field"
                v-model="form.links[index].info"
              />
              <button
                @click="
                  e => {
                    e.preventDefault();
                    removeLink(index);
                  }
                "
                class="btn btn-outline-danger my-2"
              >
                Ta bort länk {{ index + 1 }}
              </button>
            </div>
          </div>
          <button @click="addLink" class="mt-3 mb-4 btn btn-outline-info">
            Ny länk +
          </button>
        </div>
      </b-col>
    </b-row>

    <div v-if="!edit" class="input-grp">
      <button @click="cancelDog" class="btn btn-danger mt-3">Avbryt</button>
      <div class="continue-btns">
        <button
          @click="submitAndPublishDog"
          class="btn btn-primary ml-lg-3 mt-3"
        >
          Spara
        </button>
      </div>
    </div>
    <div v-else class="input-grp">
      <div class="continue-btns">
        <button @click="saveDog" class="btn btn-info ml-lg-2 mt-3">
          Spara redigering
        </button>
        <p v-if="error" class="text-danger mt-2">
          Något gick fel vid sparningen, ladda om sidan och försök igen
        </p>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "editDog",
  props: ["toggleEdit", "dog", "edit"],
  data() {
    return {
      form: {
        link: "",
        breed: "",
        name: "",
        desc: [""],
        image: "",
        links: [
          {
            link: "",
            name: "",
            image: "",
            info: ""
          }
        ],
        dateOfBirth: ""
      },
      error: ""
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
    removeParagraph(id) {
      this.form.desc.splice(id, 1);
    },
    addParagraph(e) {
      e.preventDefault();
      this.form.desc.push("");
    },
    removeLink(id) {
      this.form.links.splice(id, 1);
    },
    addLink(e) {
      e.preventDefault();
      this.form.links.push({
        link: "",
        name: "",
        image: "",
        info: ""
      });
    },
    setDefaultValues() {
      this.form = this.dog;
      if (this.dog.dateOfBirth.includes("T")) {
        this.form.dateOfBirth = this.dog.dateOfBirth.slice(
          0,
          this.dog.dateOfBirth.indexOf("T")
        ); // remove time from date in order to match the expected value of input type="date" - Expected: YYYY-MM-DD
      }
    },
    cancelDog(e) {
      e.preventDefault();
      this.$router.go(-1);
    },
    async saveDog(e) {
      e.preventDefault();
      const response = await axios({
        method: "PUT",
        url: `/api/dogs/${this.dog._id}`,
        data: this.form
      });

      if (response.data.error) {
        this.error = true;
        return;
      }
      history.pushState(
        {},
        null,
        "/hundarna/" + encodeURIComponent(this.form.link)
      );
      const dog = response.data;
      this.toggleEdit("toggleEdit", dog);
    },
    async submitAndPublishDog(e) {
      e.preventDefault();
      this.form.link = this.form.name.toLowerCase();
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
      // display: inline-block;
      text-align: right;
      // @include media-breakpoint-down(md) {
      //   width: 100%;
      // }
    }
  }
  button {
    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }
}
</style>

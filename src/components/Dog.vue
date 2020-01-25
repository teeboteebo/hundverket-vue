<template>
  <div class="dog" :style="{position: 'relative'}">
    <div v-if="birthday" :style="{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}">
      <img src="/images/birthday.gif" class="w-100 h-100" />
    </div>

    <b-row>
      <b-col cols="12">
        <h2 class="text-center">{{dog.name}}</h2>
        <div class="border-bottom mb-3" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" offset-md="1" md="5" offset-lg="2" lg="4">
        <img
          class="img-fluid"
          :src="dog.image"
          alt="Bild på Elisabeth tillsammans med Sally och Ebbe"
        />
      </b-col>
      <b-col cols="12" md="5" xl="4" class="mt-4 mt-md-0">
        <p
          class="font-italic"
        >{{dog.breed}} | {{new Date(dog.dateOfBirth).toLocaleString('sv-SE', {year: 'numeric', month: 'numeric', day: 'numeric'})}}</p>
        <p v-for="(desc, index) in dog.desc" :key="'desc_'+index">{{desc}}</p>
      </b-col>
      <div class="mt-3 w-100 border-bottom" />
    </b-row>
    <b-container fluid class="links">
      <b-row class="mt-3" v-if="dog.links">
        <b-col
          cols="12"
          offset-lg="3"
          lg="6"
          v-for="(link, index) in dog.links"
          :key="'link_' + index"
          class="border border-primary rounded mb-2 py-2"
          :class="!link.info ? 'd-flex align-items-center' : ''"
          :style="{position: 'relative'}"
        >
          <p v-if="link.info" class="mb-0 font-weight-bold border-bottom mb-2">{{link.name}}</p>
          <b-row>
            <b-col cols="4" :class="!link.info ? 'border-right' : ''">
              <img class="img-fluid" :src="link.image" alt="länkbild" />
            </b-col>
            <b-col
              :cols="!link.info ? '5' : '8'"
              :class="!link.info ? 'pr-0 font-weight-bold' : ''"
            >{{link.info ? link.info : link.name}}</b-col>
            <b-col v-if="link.link && !link.info" cols="3" class="pl-0 text-right">
              <a target="_blank" rel="noreferrer noopener" :href="link.link">
                Läs mer
                <ExternalLinkIcon size="16" class="mb-1" />
              </a>
            </b-col>
          </b-row>
          <a
            v-if="link.link && link.info"
            target="_blank"
            rel="noreferrer noopener"
            :href="link.link"
            :style="{position: 'absolute', top: '.5rem', right: '1rem',}"
          >
            Läs mer
            <ExternalLinkIcon size="16" class="mb-1" />
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { ExternalLinkIcon } from "vue-feather-icons";
export default {
  name: `dogComponent`,
  props: ["dog"],
  data() {
    return {
      birthday: false
    }
  },
  components: {
    ExternalLinkIcon
  },
  beforeMount() {
    const dogBOD = new Date(this.dog.dateOfBirth).toLocaleString('sv-SE', {month: 'numeric', day: 'numeric'})
    const today = new Date().toLocaleString('sv-SE', {month: 'numeric', day: 'numeric'})
    if(dogBOD === today){
      this.birthday = true
    }
  }
};
// :style="!link.info ? {marginTop:'15%'} : ''"
</script>
<style lang="scss" scoped>
@import "@/scss/bootstrap";
.dog {
  .dog-image {
    width: 100%;
    height: auto;
  }
  .links {
    font-size: 12px;
    a {
      font-size: 10px;
    }
    @include media-breakpoint-up(md) {
      font-size: 14px;
      a {
        font-size: 10px;
      }
    }
    @include media-breakpoint-up(md) {
      font-size: 16px;
      a {
        font-size: 14px;
      }
    }
  }
}
</style>
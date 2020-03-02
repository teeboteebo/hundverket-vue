<template>
  <b-container>
    <b-row class="w-100 no-gutters">
      <b-col cols="8" lg="4" class="text-left">
        <div class="logo-holder d-inline-block">
          <router-link to="/" aria-label="Tillbaka till start">
            <img class="logo-img" alt="Hudverket logo" src="@/assets/logo-dog.png" />
          </router-link>
        </div>
      </b-col>
      <b-col cols="4" lg="8" class="d-none d-lg-flex align-items-center">
        <Menu :links="links" />
      </b-col>
      <b-col cols="4" class="d-flex d-lg-none align-items-center">
        <Hamburger :links="links" />
        <!-- <b-navbar-toggle
            class="text-primary border-white text-white"
            target="nav-collapse"
            :style="{color: 'var(--primary'}"
        ></b-navbar-toggle>-->
      </b-col>
      <!-- <b-col cols="0" lg="7">
          <b-collapse id="nav-collapse" is-nav class="py-3 py-lg-0">
            <b-navbar-nav>
              <router-link
                v-for="link in links"
                :key="link.id"
                class="nav-item"
                :to="link.to"
              >{{link.name}}</router-link>
            </b-navbar-nav>
          </b-collapse>
      </b-col>-->
    </b-row>
  </b-container>
  <!-- <nav class="nav text-right">
            <router-link
              v-for="link in links"
              :key="link.id + 'ss'"
              :to="link.to"
              class="nav-item"
            >{{link.name}}</router-link>
  </nav>-->
</template>

<script>
import Menu from "./Menu";
import Hamburger from "./Hamburger";
export default {
  name: "headerContent",
  components: { Hamburger, Menu },
  data: () => {
    return {
      links: [
        {
          to: "/",
          name: "Hem",
          id: 1
        },
        {
          to: "/galleri",
          name: "Galleri",
          id: 2
        },
        {
          to: "/hundarna",
          name: "Hundarna",
          id: 3,
          subLinks: [
            {
              to: "/hundarna/ebbe",
              name: "Ebbe",
              id: 3.1
            },
            {
              to: "/hundarna/sally",
              name: "Sally",
              id: 3.2
            }
          ]
        },
        {
          to: "/om-mig",
          name: "Om mig",
          id: 4
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/bootstrap";

header {
  .logo-holder {
    width: 100%;
    max-width: 200px;
    @include media-breakpoint-down(md) {
      max-width: 200px;
    }
    flex-wrap: nowrap;
    .logo-img {
      width: 100%;
      height: auto;
    }
  }
  & > nav,
  & > div {
    display: inline-block;
  }
}
</style>

<template>
  <b-navbar class="min-w-100 p-0 p-2" sticky toggleable="lg" type="dark" variant="primary">
    <b-container>
      <b-row>
        <b-col cols="8" lg="5" class="text-left">
          <div class="logo-holder d-inline-block p-2">
            <router-link to="/">
              <img class="logo-img" src="@/assets/logo.png" />
              <img class="ebbe-img d-none d-lg-inline-block" src="@/assets/ebbe.jpg" />
            </router-link>
          </div>
        </b-col>
        <b-col cols="4" lg="0" class="d-lg-none text-right align-self-center pl-0">
          <b-navbar-toggle
            class="text-primary border-white text-white"
            target="nav-collapse"
            :style="{color: 'white'}"
          ></b-navbar-toggle>
        </b-col>
        <b-col cols="0" lg="7">
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
        </b-col>
      </b-row>
    </b-container>
  </b-navbar>
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
export default {
  name: "header-component",
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
          sublinks: [
            {
              to: "/hundarna/ebbe",
              name: "Ebbe"
            },
            {
              to: "/hundarna/sally",
              name: "Sally"
            }
          ]
        },
        {
          to: "/kontakt",
          name: "Kontakt",
          id: 4
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  padding-top: 50px;
  .logo-holder {
    width: 100%;
    flex-wrap: nowrap;
    .logo-img {
      width: 70%;
      height: auto;
      margin-right: 10px;
      filter: brightness(0) invert(1);
    }
    .ebbe-img {
      width: 20%;
      height: auto;
      border-radius: 1000px;
    }
  }
  & > nav,
  & > div {
    display: inline-block;
  }
  nav {
    width: 100%;
    .nav-item {
      display: inline-block;
      font-size: 22px;
      font-weight: bold;
      color: #ccc;
      margin-left: 20px;
      text-decoration: none;
      &.router-link-exact-active {
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <b-container>
      <header>
        <b-row>
          <b-col>
            <div class="logo-holder">
              <img class="logo-img" src="@/assets/logo.png" />
              <img class="ebbe-img" src="@/assets/ebbe.jpg" />
            </div>
          </b-col>
          <b-col>
            <NavMenu />
          </b-col>
        </b-row>
      </header>
    </b-container>
    <main>
      <router-view />
    </main>
    <footer>Footer</footer>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu.vue";

export default {
  name: "app",
  components: {
    NavMenu
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  --primary: #008a46;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  header {
    padding-top: 50px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo-holder {
      min-width: 300px;
      margin: 0;
      width: 300px;
      flex-wrap: nowrap;
      .logo-img {
        width: 210px;
        height: auto;
        margin-right: 10px;
      }
      .ebbe-img {
        width: 70px;
        height: auto;
        border-radius: 1000px;
      }
    }
    & > nav,
    & > div {
      display: inline-block;
    }
    nav {
      align-self: flex-end;
    }
  }
  main {
    flex: 1;
  }
  footer {
    color: #eee;
    background-color: var(--primary);
  }
}
</style>

<template>
  <div id="app">
    <header>
      <Header />
    </header>
    <main>
      <b-container fluid class="p-0">
        <router-view />
      </b-container>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/_breakpoints";

* {
  margin: 0;
  padding: 0;
}
#app {
  --primary: #008a46;
  --text: #282f36;
  overflow: hidden;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text);
  main {
    flex: 1;
    min-height: 800px;
  }
  footer {
    color: #fff;
    background-color: var(--primary);
  }
}
</style>

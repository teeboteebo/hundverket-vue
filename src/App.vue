<template>
  <div id="app">
    <header class="align-items-center d-flex">
      <Header />
    </header>
    <main>
      <router-view />
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
@import "./scss/bootstrap";

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
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text);

  header {
    font-family: "Source Sans Pro", sans-serif;
    display: flex;
    align-items: center;
    height: 70px;
    position: fixed;
    width: 100%;
    background-color: #fff;
    -webkit-box-shadow: 0px -21px 31px 10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px -21px 31px 10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px -21px 31px 10px rgba(0, 0, 0, 0.75);
    z-index: 1000;
  }
  main {
    flex: 1;
    margin-top: 70px;
    display: flex;
    .wrapper {
      flex: 1;
      padding-top: 3rem;
      padding-bottom: 3rem;
      background-color: #fff;
    }
    background-color: #eee;
  }
  footer {
    color: #fff;
    background-color: var(--primary);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Source Sans Pro", sans-serif;
  }
}
</style>

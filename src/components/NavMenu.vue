<template>
  <nav class="navmenu">
    <router-link v-for="link in links" :key="link.id + 'ss'" :to="link.to">{{link.name}}</router-link>
  </nav>
</template>

<script>
export default {
  name: "navmenu",
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
          id: 3
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
.navmenu {
  width: 100%‡;
  text-align: right;
  a {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
    margin-left: 20px;
    text-decoration: none;
    &.router-link-exact-active {
      color: var(--primary);
    }
  }
}
</style>

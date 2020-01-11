<template>
  <nav class="menu-content">
    <ul>
      <li v-for="link in links" :key="link.id">
        <div v-if="link.subLinks" class="nav-item nav-dropdown">
          <router-link class="dd-item r-link" :to="link.to">{{link.name}}</router-link>
          <ul class="dd-menu">
            <li class="dd-item" v-for="subLink in link.subLinks" v-bind:key="subLink.id">
              <router-link class="r-link" :to="subLink.to">{{subLink.name}}</router-link>
            </li>
          </ul>
        </div>
        <router-link v-else class="nav-item r-link" :to="link.to">{{link.name}}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "menuContent",
  props: ["links"]
};
</script>
<style lang="scss" scoped>
.menu-content {
  position: relative;
  width: 100%;
  text-align: right;
  ul {
    margin: 0;
    display: flex;
    max-width: 600px;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    li {
      margin-left: 40px;
      text-align: right;
      display: flex;
      align-items: flex-end;
      & > .nav-item {
        font-size: 1.2rem;
        font-weight: bold;
        &.nav-dropdown {
          position: relative;
          & > a::after {
            content: "v";
            font-size: 12px;
            position: absolute;
            top: 6px;
            right: -12px;
            color: var(--text);
            text-decoration: none;
          }
          ul.dd-menu {
            display: none;
            position: absolute;
            padding: 5px 10px;
            left: -1px;
            top: 1.6rem;
            font-weight: normal;
            background-color: white;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            width: 200px;
            li.dd-item {
              width: 100% !important;
              margin: 0;
              a {
                font-size: 1rem;
              }
              &:not(:first-child) {
                border-top: 1px solid rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
        &.nav-dropdown:hover {
          // & > a {
          //   position: relative;
          // }
          & > a::after {
            content: "ʌ";
            font-size: 12px;
            color: var(--text);
            position: absolute;
            top: 6px;
            right: -12px;

            text-decoration: none;
          }
          ul {
            display: inline-block;
          }
        }
      }
    }
  }
  //Link styling
  .r-link {
    color: var(--text);
    text-decoration: none;
    transition: 0.3s color;
    &:hover {
      color: var(--primary);
    }
  }
  .router-link-exact-active {
    color: var(--primary);
    text-decoration: none;
  }
}
</style>

<template>
  <nav id="navigation">
    <!-- Hamburger -->
    <div
      class="hamburger"
      :class="toggle ? 'open' : ''"
      ref="animateHamburger"
      @click="navbarToggles"
      @keyup.esc="closeMenu"
      tabindex="0"
    >
      <span class="strips"></span>
    </div>
    <div ref="myOverlay" @click="closeMenu" class="overlay">
      <!-- Overlay content -->
      <ul class="overlay-content">
        <li v-for="link in links" :key="link.id">
          <span @click="linksInOverlay(link.to)" class="overlayLink">{{
            link.name
          }}</span>
          <div v-if="link.subLinks">
            <span
              v-for="subLink in link.subLinks"
              :key="subLink.id"
              @click="linksInOverlay(subLink.to)"
              class="overlay-subLink"
              >- {{ subLink.name }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "hamburgerContent",
  components: {},
  props: ["links"],
  data() {
    return {
      toggle: false
    };
  },
  methods: {
    linksInOverlay(route) {
      // Prevent route changing if same route is clicked, only scroll to top
      if (route !== this.$router.history.current.path) {
        this.$router.push(route);
      }
      window.scrollTo(0, 0);
      this.navbarToggles();
    },
    closeMenu() {
      this.toggle = true;
      this.navbarToggles();
    },
    navbarToggles() {
      this.toggle = !this.toggle;
      if (this.toggle) {
        const hamburgerArrow = this.$refs.animateHamburger;
        hamburgerArrow.classList.add("open");
        const toggle = this.$refs.myOverlay;
        toggle.style.top = "0";
      } else if (!this.toggle) {
        const hamburgerStrips = this.$refs.animateHamburger;
        hamburgerStrips.classList.remove("open");
        const closeNav = this.$refs.myOverlay;
        closeNav.style.top = "-130vh";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/bootstrap";
#navigation {
  z-index: 10000;
  height: 35px;
  position: absolute;
  right: 0;
  display: inline-block;
}
/****** Hamburger ******/
.hamburger {
  display: inline-block;
  height: 35px;
  width: 35px;
  background-color: transparent;
  border-radius: 3px;
  position: relative;
  z-index: 10000 !important;
  cursor: pointer;
  outline: none;
  @media screen and (max-width: 375px) {
    padding: 0 !important;
  }
}
span.strips {
  background-color: var(--text);
  height: 4px;
  width: 24px;
  border-radius: 2px;
  position: absolute;
  top: 45%;
  left: 15%;
  transition: all 0.7s ease;
}
div.hamburger.open span.strips {
  background-color: #fff;
  -webkit-transform: rotate(270deg);
  -ms-transfrom: rotate(270deg);
  transform: rotate(270deg);
}
span.strips::before {
  content: "";
  background-color: var(--text);
  height: 4px;
  width: 24px;
  border-radius: 2px;
  position: absolute;
  bottom: 200%;
  width: 100%;
  left: 0;
  transition: all 0.7s ease;
}
div.hamburger.open span.strips::before {
  bottom: 4px;
  left: 12px;
  width: 16px;
  background-color: #fff;

  -webkit-transform: rotate-(135deg);
  -ms-transfrom: rotate(-135deg);
  transform: rotate(-135deg);
}
span.strips::after {
  content: "";
  background-color: var(--text);
  height: 4px;
  width: 24px;
  border-radius: 2px;
  position: absolute;
  top: 200%;
  width: 100%;
  left: 0;
  background-color: var(--text);

  transition: all 0.7s ease;
}
div.hamburger.open span.strips::after {
  top: 4px;
  left: 12px;
  width: 16px;
  background-color: #fff;
  -webkit-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  transform: rotate(135deg);
}
/****** Overlay ******/
.overlay {
  height: 100vh;
  width: 100%;
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  top: -130vh;
  left: 0;
  background-color: #000; /* Black fallback color */
  background-color: rgba(0, 0, 0, 0.85); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s top; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}
/* Position the content inside the overlay */
.overlay-content {
  position: relative;
  top: 5%; /* 20% from the top */
  max-width: 200px;
  text-align: left; /* Centered text/links */
  margin: 30px auto 0; /* 30px top margin to avoid conflict with the close button on smaller screens */
}

.overlay {
  ul {
    list-style: none;
  }
  .overlayLink,
  .overlay-subLink {
    font-weight: bold;
    font-family: "Source Sans Pro", sans-serif;
    padding: 8px;
    text-decoration: none;
    color: #aaa;
    display: block; /* Display block instead of inline */
    transition: 0.15s; /* Transition effects on hover (color) */
    &:hover,
    &:focus {
      -webkit-animation: pulse 2s;
      animation: pulse 2s;
      cursor: pointer !important;
      color: #f1f1f1;
    }
    font-size: 24px;
    @media screen and (orientation: landscape) {
      font-size: 14px;
    }
    @include media-breakpoint-up(sm) {
      font-size: 26px;
      @media screen and (orientation: landscape) {
        font-size: 14px;
      }
    }
    @include media-breakpoint-up(md) {
      font-size: 36px;
      @media screen and (orientation: landscape) {
        font-size: 14px;
      }
    }
  }
  .overlay-subLink {
    margin-left: 0.5rem;
  }
}
</style>

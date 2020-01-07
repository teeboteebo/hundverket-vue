<template>
  <div class="menu">
    <nav id="navigation" class>
      <!-- !-- Hamburger--- -->
      <div class="navbar-header">
        <div
          class="hamburger"
          :class="toggle ? 'open' : ''"
          ref="animateHamburger"
          @click="navbarToggles"
        >
          <span class="strips"></span>
        </div>
        <div ref="myOverlay" class="overlay">
          <!-- !-- Overlay content -- -->
          <ul class="overlay-content">
            <li>
              <span @click="linksInOverlay('/')" class="overlayLink"><router-link to="/">Hem</router-link></span>
            </li>
            <li>
              <span @click="linksInOverlay('/om')" class="overlayLink"><router-link to="/om">Om</router-link></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "menu",
  components: {},
  data() {
    return {
      toggle: false,
      hamburger: false
    };
  },
  methods: {
    linksInOverlay() {
      this.navbarToggles();
    },
    navbarToggles() {
      this.toggle = !this.toggle;
      this.hamburger = !this.hamburger;
      if (this.toggle && this.hamburger) {
        const hamburgerArrow = this.$refs.animateHamburger;
        hamburgerArrow.classList.add("open");
        const toggle = this.$refs.myOverlay;
        toggle.style.top = "0";
      } else if (!this.toggle && !this.hamburger) {
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
#navigation {
  text-align: right;
  z-index: 10000;
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
  top: 25%; /* 25% from the top */
  width: 100%; /* 100% width */
  text-align: center; /* Centered text/links */
  margin-top: 30px; /* 30px top margin to avoid conflict with the close button on smaller screens */
}
/* The navigation links inside the overlay */
.overlay > ul > li > .overlayLink {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
  &:hover {
    -webkit-animation: pulse 2s;
    animation: pulse 2s;
    cursor: pointer !important;
  }
}
/* When you mouse over the navigation links, change their color */
.overlay > ul > li > .overlayLink:hover,
.overlay > ul > li > .overlayLink:focus {
  color: #f1f1f1;
}
/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
  .overlay > ul > li > .overlayLink {
    font-size: 20px;
  }
}
</style>
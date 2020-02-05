<template>
  <div class="footer">
    <div>
      <div>
        <ul>
          <li>
            <a href="tel:+4600705875878">
              <PhoneIcon size="16" />&nbsp;0705 - 875 878
            </a>
          </li>
          <li>
            <a href="mailto:elisabeth.asplund.63@gmail.com">
              <MailIcon size="16" />&nbsp;Skicka mail
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/pg/hundverketiskane/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon size="16" />&nbsp;Hundverket i Skåne
            </a>
          </li>
          <li>
            <address>
              <a
                href="https://www.google.com/maps/place/Kalkemadsvägen+9,+233+38+Svedala/"
                target="_blank"
                rel="noopener noreferrer"
                :style="{ whiteSpace: 'nowrap' }"
              >
                <MapPinIcon size="16" />&nbsp;Kalkemadsvägen 9,<br />
                233 38 Svedala
              </a>
            </address>
          </li>
        </ul>
        <section>
          <router-link to="/">
            <img
              class="elisabeth-img"
              src="@/assets/elisabeth.jpg"
              alt="Elisabeth med Ebbe"
            />
            <img class="logo-img" src="@/assets/logo.png" />
          </router-link>
        </section>
      </div>
    </div>
    <p class="copy-claim">
      Organisationsnummer: SE631024352901<br />Innehar F-skatt
    </p>
  </div>
</template>
<script>
import {
  PhoneIcon,
  FacebookIcon,
  MapPinIcon,
  MailIcon
} from "vue-feather-icons";
export default {
  name: "footerContent",
  components: {
    PhoneIcon,
    FacebookIcon,
    MapPinIcon,
    MailIcon
  }
};
</script>
<style lang="scss" scoped>
.footer {
  min-height: 300px;
  color: #fff;
  font-size: 1rem;
  position: relative;
  div {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    div {
      padding: 0 1rem;
      display: flex;
      padding-top: 50px;
      flex-direction: row;
      height: 250px;
      ul {
        padding-top: 100px;
        flex: 1;
        margin: 0;
        padding: 0;
        text-indent: 0;
        text-align: left;
        list-style-type: none;
        li {
          margin-bottom: 16px;
        }
        a {
          text-decoration: none;
          color: #fff;
          &:hover,
          &:active {
            transition: 0.15s color;
            color: var(--text);
          }
        }
      }
      section {
        flex: 1;
        text-align: right;
        img {
          display: inline-block;
          width: 65%;
          height: auto;
        }
        .elisabeth-img {
          border-radius: 1000px;
          margin-bottom: 10px;
        }
        .logo-img {
          filter: brightness(0) invert(1);
        }
      }
    }
  }
  .copy-claim {
    font-size: 0.8rem;
    margin: 0 auto;
    // position: absolute;
    // bottom: 10px;
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>

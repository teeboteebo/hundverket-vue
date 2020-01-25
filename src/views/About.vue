<template>
  <b-container class="about wrapper">
    <b-row>
      <b-col cols="12">
        <h2 class="text-center">Om mig</h2>
        <div class="border-bottom mb-3" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" offset-md md="6" offset-lg="2" lg="4">
        <img
          class="img-fluid"
          src="/images/elisabeth-dogs.jpg"
          alt="Bild på Elisabeth tillsammans med Sally och Ebbe"
        />
      </b-col>
      <b-col cols="12" md="5" xl="4" class="mt-4 mt-md-0 info-section">
        <p>
          Jag är legitimerad svensk- och engelsklärare samt specialpedagog. Till
          vardags arbetar jag på Gymnasieskolan Vipan i Lund på
          Introduktionsprogrammen.
        </p>
        <p>
          Hundarna är med mig varje dag i skolan. Vi har olika uppdrag som t.ex.
          läshund eller att motivera till rörelse eller helt enkelt att komma
          till skolan.
        </p>
        <p>När tillfälle ges tar jag även externa uppdrag.</p>
        <div class="border border-primary rounded">
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
            <li class="mb-0">
              Organisationsnummer: SE631024352901, innehar F-skatt
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { PhoneIcon, FacebookIcon, MailIcon } from "vue-feather-icons";
export default {
  name: "about",
  components: {
    PhoneIcon,
    FacebookIcon,
    MailIcon
  }
};
</script>
<style lang="scss" scoped>
.info-section {
  p {
    max-width: 380px;
  }
  ul {
    margin: 0;
    padding: 1rem;
    text-indent: 0;
    text-align: left;
    list-style-type: none;
    li {
      margin-bottom: 0.5rem;
    }
    a {
      text-decoration: none;
      &:hover,
      &:active {
        transition: 0.15s color;
        color: var(--text);
      }
    }
  }
}
</style>

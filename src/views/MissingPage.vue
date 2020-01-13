<template>
  <b-container class="dog wrapper">
    <b-row>
      <b-col>
        <h2>Sidan saknas :(</h2>
        <p class="mt-4">
          Den angivna adressen finns inte: <br />
          <span class="url">{{pathname}}</span>
        </p>
        <p class="mt-4">
          Klicka
          <router-link to="/" class="text-secondary">här</router-link>&nbsp;för att komma tillbaka till start.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "missingpage",
  data() {
    return {
      pathname: document.location.href
    };
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  text-align: center;
  .url {
    font-style: italic;
    font-weight: bold;
    color: blue
  }
}
</style>

<template>
  <b-container class="admin-page wrapper">
    <b-row v-if="this.state.loggedIn"> 

    </b-row>
    <b-row v-else>
      <b-col cols="12">
        <form class="login-form" v-on:submit="submitLogin">
          <h3>Logga in</h3>
          <div class="input-grp">
            <label class="label" for="Epost">Epost</label>
            <input
              name="Epost"
              type="email"
              autocomplete="username"
              class="data-input mail"
              v-model="form.email"
            />
          </div>
          <div class="input-grp">
            <label class="label" for="Lösenord">Lösenord</label>
            <input
              name="Lösenord"
              type="password"
              autocomplete="current-password"
              class="data-input password"
              v-model="form.password"
            />
          </div>
          <button type="submit" class="submit-btn btn btn-primary">
            <span v-if="!this.state.sent">Logga in</span>
            <b-spinner small v-else />
          </button>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "admin",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      state: {
        sent: false,
        loggedIn: false
      }
    };
  },
  updated() {
    console.log(this.email);
  },
  methods: {
    async submitLogin(e) {
      e.preventDefault();
      this.state.sent = true;
      let response = await axios({
        method: "POST",
        url: "/api/login",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      });
      this.response = true;
      console.log(response);
    }
  }
};
</script>
<style lang="scss" scoped>
.admin-page {
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    h3 {
      font-family: "Source Sans Pro", sans-serif;
      margin-bottom: 25px;
    }
    .input-grp {
      .label {
        margin-bottom: 2px;
      }
      .data-input {
        display: block;
        width: 100%;
        padding: 6px;
        border-radius: 4px;
        margin-bottom: 20px;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .submit-btn {
      width: 100%;
      min-height: 38px;
    }
  }
}
</style>

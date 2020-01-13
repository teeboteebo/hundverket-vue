<template>
  <b-container class="wrapper">
    <div v-if="state.loggedIn" class="admin-page">
      <h3>Kontrollpanel</h3>
      <p>Inloggad som: {{state.loggedIn.email}}</p>
      <button @click="logout" small class="btn btn-danger mb-5">Logga ut</button>
      <b-row>
        <b-col cols="12" lg="6">
          <h4>Inlägg</h4>
          <button class="btn btn-info mb-4">
            Skapa nytt inlägg
            <PlusIcon size="14" />
          </button>
          <table>
            <tr>
              <th>Titel</th>
              <th class="text-right">Publicerad</th>
            </tr>
            <tr class="article-preview">
              <td>Läsning i skolan</td>
              <td class="text-right">
                <input type="checkbox" />
              </td>
            </tr>
            <tr class="article-preview">
              <td>Sally utbildning</td>
              <td class="text-right">
                <input type="checkbox" checked />
              </td>
            </tr>
            <tr class="article-preview">
              <td>Nya sidan</td>
              <td class="text-right">
                <input type="checkbox" checked />
              </td>
            </tr>
          </table>
          <div class="pagination">
            <div>
              <span>&lt;</span>
              <span class="font-weight-bold">1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>&gt;</span>
            </div>
          </div>
        </b-col>
        <b-col cols="12" lg="6" class="mt-4 mt-lg-0">
          <h4>Hundarna</h4>
          <button class="btn btn-info">
            Lägg till ny hund
            <PlusIcon size="14" />
          </button>
        </b-col>
      </b-row>
    </div>
    <div v-else class="login-page">
      <b-row>
        <b-col cols="12">
          <form class="login-form" v-on:submit="submitLogin">
            <h3>Inloggning</h3>
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
              <span v-if="!this.state.loading">Logga in</span>
              <b-spinner small v-else />
            </button>
          </form>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { PlusIcon } from "vue-feather-icons";
import axios from "axios";
export default {
  name: "admin",
  components: {
    PlusIcon
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      state: {
        loading: false,
        loggedIn: false
      }
    };
  },
  beforeMount() {
    this.checkIfLoggedIn();
  },
  methods: {
    async logout() {
      await axios({
        method: "DELETE",
        url: "/api/login"
      });
      this.checkIfLoggedIn();
    },
    async checkIfLoggedIn() {
      let response = await axios({
        method: "GET",
        url: "/api/login"
      });
      console.log(response.data);
      if (response.data._id) {
        this.state.loggedIn = response.data;
      } else this.state.loggedIn = false;
    },
    async submitLogin(e) {
      e.preventDefault();
      this.state.loading = true;
      let response = await axios({
        method: "POST",
        url: "/api/login",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      });
      console.log(response.data);
      this.state.loading = false;
      if (response.data.success) {
        this.state.loggedIn = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  h3 {
    font-family: "Source Sans Pro", sans-serif;
    margin-bottom: 25px;
    text-align: center;
  }
  .admin-page {
    table {
      padding: 100px;
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .article-preview {
        height: 50px;
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:not(:first-child) {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
    .pagination {
      margin: 1rem auto;
      display: flex;
      div {
        text-align: center;
        flex: 1;
        display: inline-block;
        & > * {
          padding: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          &:hover {
            background-color: var(--primary);
            cursor: pointer;
          }
        }
      }
    }
  }
  .login-page {
    .login-form {
      max-width: 400px;
      margin: 0 auto;

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
        line-height: 12px;
        width: 100%;
        min-height: 38px;
      }
    }
  }
}
</style>

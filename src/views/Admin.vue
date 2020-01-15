<template>
  <b-container class="wrapper">
    <div v-if="state.loggedIn" class="admin-page">
      <h3>Kontrollpanel</h3>
      <p>Inloggad som: {{state.loggedIn.email}}</p>
      <button @click="logout" small class="btn btn-danger mb-5">Logga ut</button>
      <b-row>
        <b-col cols="12" lg="6">
          <h4>Inlägg</h4>
          <router-link to="/nytt-inlagg" class="btn btn-info mb-4">Skapa nytt inlägg +</router-link>
          <table>
            <tr>
              <th width="100%">Titel</th>
              <th nowrap>Publicerad</th>
            </tr>
            <tr v-for="article in articles" :key="article._id" class="article-preview">
              <td
                @click="openArticle(article.link)"
                class="article-headline"
                width="100%"
              >{{article.headline}}</td>
              <td nowrap class="text-right">
                <label class="switch">
                  <input
                    type="checkbox"
                    @click="togglePublish(article.link)"
                    :checked="article.published"
                  />
                  <span class="slider round"></span>
                </label>
              </td>
              <div class="date">
                <span>
                  Skapad: {{new Date(article.created).toLocaleString('sv-SE', {year: "numeric", month: "numeric", day: "numeric"}) }}
                  , Redigerad: {{new Date(article.edited).toLocaleString('sv-SE', {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric"}) }}
                </span>
              </div>
            </tr>
          </table>
          <div class="pagination">
            <div>
              <button
                :disabled="this.state.page === 1 ? true : false"
                @click="decPage"
                class="btn btn-info"
              >&lt; Föregående sida</button>
              <span class="page">sida {{this.state.page}}</span>
              <button
                :disabled="this.state.currAmtArticles < 5 ? true : false"
                @click="incPage"
                class="btn btn-info"
              >Nästa sida &gt;</button>
            </div>
          </div>
        </b-col>
        <b-col cols="12" lg="6" class="mt-4 mt-lg-0">
          <h4>Hundarna</h4>
          <button class="btn btn-info">Lägg till ny hund +</button>
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
import axios from "axios";
export default {
  name: "admin",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      state: {
        loading: false,
        loggedIn: false,
        page: 1,
        currAmtArticles: ""
      },
      articles: []
    };
  },

  async beforeMount() {
    await this.checkIfLoggedIn();
    if (this.state.loggedIn) {
      this.getArticles();
    }
  },
  methods: {
    openArticle(link) {
      this.$router.push("/inlagg/" + link);
    },
    async togglePublish(link) {
      await axios({
        method: "PUT",
        url: `/api/articles/${link}`
      });
    },
    async decPage() {
      await this.state.page--;
      this.getArticles();
    },
    async incPage() {
      await this.state.page++;
      this.getArticles();
    },
    async getArticles(page = this.state.page) {
      let articles = await axios({
        method: "GET",
        url: `/api/articles?page=${page}`
      });
      this.articles = articles.data;
      this.state.currAmtArticles = articles.data.length;
    },
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
      if (response.data._id) {
        this.state.loggedIn = response.data;
        if (!this.articles[0]) {
          this.getArticles();
        }
      } else this.state.loggedIn = false;
    },
    async submitLogin(e) {
      e.preventDefault();
      this.state.loading = true;
      await axios({
        method: "POST",
        url: "/api/login",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      });
      this.state.loading = false;
      this.checkIfLoggedIn();
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
        height: 75px;
        position: relative;
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:not(:first-child) {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        .date {
          font-style: italic;
          position: absolute;
          opacity: 0.7;
          font-size: 10px;
          left: 15px;
          white-space: nowrap;
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 30px;
          height: 15px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 11px;
          width: 11px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        input:checked + .slider {
          background-color: #2196f3;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(15px);
          -ms-transform: translateX(15px);
          transform: translateX(15px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 17px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      }
    }
    .pagination {
      margin: 1rem auto;
      display: flex;
      div {
        text-align: center;
        flex: 1;
        display: flex;
        & > * {
          padding: 0.5rem;
        }
        .page {
          flex: 1;
        }
        .left,
        .right {
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          min-width: 100px;
          &:hover {
            background-color: var(--primary);
            color: #fff;
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

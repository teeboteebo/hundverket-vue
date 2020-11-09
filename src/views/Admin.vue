<template>
  <b-container class="wrapper">
    <div v-if="loggedIn" class="admin-page">
      <h3>Kontrollpanel</h3>
      <p>Inloggad som: {{ loggedIn.email }}</p>
      <button @click="logout" small class="btn btn-danger mb-5">
        Logga ut
      </button>
      <b-row>
        <b-col cols="12" lg="6">
          <h4>Inlägg</h4>
          <router-link to="/nytt-inlagg" class="btn btn-info mb-4"
            >Skapa nytt inlägg +</router-link
          >
          <p class="border rounded p-1">
            Artikeln som visas överst:
            <span class="font-weight-bold">{{ state.currentTop }}</span>
          </p>
          Sortera efter:
          <select
            @change="sortArticles"
            v-model="state.sortBy"
            class="ml-2 btn btn-info p-1"
          >
            <option value="created" selected>Datum skapat</option>
            <option value="publishedAt">Datum publicerat</option>
          </select>
          <table>
            <tr>
              <th width="100%">Titel</th>
              <th nowrap>Publicerad</th>
            </tr>
            <tr
              v-for="article in articles"
              :key="article._id"
              class="article-preview"
            >
              <td
                @click="openArticle(article.link)"
                class="article-headline"
                width="100%"
              >
                {{ article.headline }}
              </td>
              <td nowrap class="text-right">
                <label class="switch">
                  <input
                    type="checkbox"
                    @click="togglePublish(article.link)"
                    :checked="article.published"
                  />
                  <span class="slider round"></span>
                </label>
                <div class="w-100 text-right">
                  <span
                    @click="deleteArticle(article)"
                    class="delete-btn bg-danger"
                  >
                    <Trash2Icon size="14" />
                  </span>
                </div>
              </td>
              <div class="date">
                <span>
                  Skapad:
                  {{
                    new Date(article.created).toLocaleString("sv-SE", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric"
                    })
                  }}
                  , Redigerad:
                  {{
                    new Date(article.edited).toLocaleString("sv-SE", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric"
                    })
                  }}
                  <span v-if="article.published">
                    , Publicerad:
                    {{
                      new Date(article.publishedAt).toLocaleString("sv-SE", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                      })
                    }}
                  </span>
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
              >
                &lt; Bakåt
              </button>
              <span class="page">sida {{ this.state.page }}</span>
              <button
                :disabled="this.state.currAmtArticles < 5 ? true : false"
                @click="incPage"
                class="btn btn-info"
              >
                Framåt &gt;
              </button>
            </div>
          </div>
        </b-col>
        <b-col cols="12" lg="6" class="mt-4 mt-lg-0">
          <h4>Hundarna</h4>
          <router-link to="/ny-hund" class="btn btn-info mb-4"
            >Lägg till ny hund +</router-link
          >
          <DogPreview
            :dog="dog"
            v-for="dog in dogs"
            :key="dog._id"
            class="mb-4"
          />
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
import { Trash2Icon } from "vue-feather-icons";
import DogPreview from "../components/DogPreview";
import axios from "axios";
export default {
  name: "admin",
  components: { Trash2Icon, DogPreview },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      state: {
        loading: false,
        page: 1,
        sortBy: "created",
        currAmtArticles: "",
        currentTop: ""
      },
      articles: [],
      dogs: []
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  async beforeMount() {
    await this.$store.dispatch("checkIfLoggedIn");
    if (this.loggedIn) {
      setTimeout(() => {
        this.getArticles();
        this.getDogs();
      }, 0);
    }
  },
  methods: {
    async sortArticles() {
      this.getArticles();
    },
    openArticle(link) {
      this.$router.push("/inlagg/" + link);
    },
    async togglePublish(link) {
      await axios({
        method: "PUT",
        url: `https://api.hundverketiskane.se/api/articles/${link}/toggle`
      });
      this.getArticles();
    },
    async decPage() {
      await this.state.page--;
      this.getArticles();
    },
    async incPage() {
      await this.state.page++;
      this.getArticles();
    },
    async deleteArticle(article) {
      if (
        confirm(
          `Är du säker på att du vill ta bort inlägget "${article.headline}"? Detta är permanent och går inte att ångra.`
        )
      ) {
        await axios({
          method: "DELETE",
          url: `https://api.hundverketiskane.se/api/articles/${article._id}`
        });
      } else {
        return;
      }
      this.getArticles();
    },
    async getDogs() {
      let dogs = await axios({
        method: "GET",
        url: "https://api.hundverketiskane.se/api/dogs"
      });
      this.dogs = dogs.data;
    },
    async getArticles(page = this.state.page, sort = this.state.sortBy) {
      let articles = await axios({
        method: "GET",
        url: `https://api.hundverketiskane.se/api/articles?page=${page}&sort=${sort}`
      });
      this.articles = articles.data.articles;
      this.state.currAmtArticles = articles.data.articles.length;
      this.state.currentTop = articles.data.first;
    },
    async logout() {
      await axios({
        method: "DELETE",
        url: "https://api.hundverketiskane.se/api/login"
      });
      this.$store.dispatch("checkIfLoggedIn");
    },
    async submitLogin(e) {
      e.preventDefault();
      this.state.loading = true;
      await axios({
        method: "POST",
        url: "https://api.hundverketiskane.se/api/login",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      });
      this.state.loading = false;
      this.$store.dispatch("checkIfLoggedIn");
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
    .delete-btn {
      font-size: 8px;
    }
    table {
      margin-top: 0.5rem;
      padding: 100px;
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      .article-preview {
        height: 75px;
        position: relative;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:not(:first-child) {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        .article-headline {
          cursor: pointer;
        }
        .delete-btn {
          cursor: pointer;
          border-radius: 4px;
          padding: 4px 4px 8px;
          line-height: 4px;
          color: #fff;
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
        button {
          min-width: 90px;
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

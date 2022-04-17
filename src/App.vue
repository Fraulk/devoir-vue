<template>
  <div class="App">
    <nav>
      <router-link class="rLink" to="/">Accueil</router-link>
      <template v-if="logged">
        <router-link class="rLink" to="/login" @click="logout()">Se déconnecter</router-link>
      </template>
      <template v-else>
        <router-link class="rLink" to="/login">Se connecter</router-link>
        <router-link class="rLink" to="/register">créer profil</router-link>
      </template>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { store } from './store';

export default {
  name: "App",
  data: () => ({
    logged: false
  }),

  mounted() {
    console.log(store.state.user)
  },

  methods: {
    logout() {
      this.logged = false
      store.state.user = {}
      store.state.logged = false
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      console.log(this.logged)
      console.log(store)
    }
  },

  watch: {
    $route() {
      this.logged = store.state.logged
    }
  }
};
</script>

<style lang="scss">
html {
  background-color: #212121;
}
.App {
  width: 100%;
  color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
}

nav {
  width: 20rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 0.5rem;

  .rLink {
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #575757;
  }
}

main {
  width: 60rem;
}
</style>

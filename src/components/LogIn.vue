<template>
    <div class="LogIn">
        <h1>connexion</h1>
        <input type="email" placeholder="mail" v-model="mail">
        <input type="password" placeholder="password" v-model="password">
        <button @click="login">connexion</button>
        <div v-if="error.length > 0">
            <div v-for="(error, i) in error" :key="i">
                {{error}}
            </div>
        </div>
    </div>
</template>

<script>
import {store} from "../store"

export default {
    data: () => ({
        mail: "",
        password: "",
        error: [],
    }),

    methods: {
        async login() {
            this.error = []
            if (this.mail && this.password) {
                const res = await fetch(`http://localhost:3000/utilisateurs`).then(res => res.json());
                const currentUser = res.find(user => user.email == this.mail)
                console.log(res)
                if (currentUser != undefined && currentUser.password == this.password) {
                    store.state.user = currentUser
                    store.state.logged = true
                    console.log(store.state.user)
                    this.error.push("connexion reussie")
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 1000);
                }
            }
            else this.error.push("remplissez tous les champs svp")
        }
    }
}
</script>

<style lang="scss" scoped>
.LogIn {
    margin: 1rem;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    input {
        height: 2rem;
    }

    button {
        background-color: green;
    }
}
</style>
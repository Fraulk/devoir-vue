<template>
    <div class="RegisterIn">
        <h1>Créer un profil</h1>
        <input type="text" placeholder="pseudo" v-model="pseudo">
        <input type="email" placeholder="mail" v-model="mail">
        <input type="password" placeholder="password" v-model="password">
        <input type="password" placeholder="confirmer password" v-model="confPassword">
        <input type="url" placeholder="url image (optionnel)" v-model="url">
        <button @click="register">Confirmer</button>
        <div v-if="error.length > 0">
            <div v-for="(error, i) in error" :key="i">
                {{error}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        pseudo: "",
        mail: "",
        password: "",
        confPassword: "",
        url: "",
        error: [],
    }),

    methods: {
        async register() {
            this.error = []
            if (this.pseudo && this.mail && this.password && this.confPassword) {
                if (this.pseudo.length < 3)
                    this.error.push("Erreur pseudo trop court")
                
                if (this.mail.indexOf('@') == -1 || this.mail.indexOf('.') == -1)
                    this.error.push("Erreur mail invlide")
                
                if (this.password.length < 6)
                    this.error.push("Erreur mdp trop court")
                
                if (this.password != this.confPassword)
                    this.error.push("Erreur confirmation mdp fausse")
                
                if (this.error.length > 0) return
                this.error = []

                const profil = {
                    pseudo: this.pseudo, 
                    email: this.mail, 
                    password: this.password, 
                    urlImgProfil: "https://thispersondoesnotexist.com/image"
                };

                const res = await fetch(`http://localhost:3000/utilisateurs`, { headers: {'Accept': "application/json", 'Content-type': 'application/json'}, method: "POST", body: JSON.stringify(profil) });
                console.log(res)
                this.$emit("register", profil);
                this.error.push("compte créé")
                setTimeout(() => {
                    this.$router.push('/login');
                }, 1000);
            }
            else this.error.push("remplissez tous les champs svp")
        }
    }
}
</script>

<style lang="scss" scoped>
.RegisterIn {
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
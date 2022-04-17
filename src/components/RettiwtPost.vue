<template>
  <div class="RettiwtPost">
    <div class="writePost" v-if="state.logged">
      Ecrire un post :
      <textarea name="post" id="post" cols="50" rows="5" v-model="postContent"></textarea>
      <button @click="post()">Envoyer</button>
    </div>
    <div class="post" v-for="(data, i) in db" :key="i">
      <div class="postHeader">
        <span class="username">{{ data.pseudo }}</span>
        <span class="date">{{ new Date(data.date).toLocaleDateString() }}</span>
      </div>
      <img :src="data.urlImgArticle" alt="" />
      <div class="content">
        {{ data.contenu }}
      </div>
      <div class="counts">
        Comments: {{ data.commentaires.length }} Likes: {{ data.like }}
      </div>
      <div class="comments">
        Commentaires :
        <RettiwtComment v-for="(comment, i) in data.commentaires" :comment="comment" :key="i" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store';
import RettiwtComment from "./RettiwtComment.vue"

export default {
  data() {
    return {
      db: {},
      state: store.state,
      postContent: "",
    };
  },
  async mounted() {
    this.db = await fetch('http://localhost:3000/articles').then(resp => resp.json());
    console.log(this.state.user);
  },

  methods: {
    async post() {
      if (this.postContent) {
        const post = {
          contenu: this.postContent, 
          urlImgArticle: "https://source.unsplash.com/random/1000x300",
          like: 0,
          pseudo: this.state.user.pseudo,
          date: Date.now(),
          commentaires: []
        }

        const res = await fetch(`http://localhost:3000/articles`, { headers: {'Accept': "application/json", 'Content-type': 'application/json'}, method: "POST", body: JSON.stringify(post)}).then(resp => resp.json());
        this.db.push(res)
      }
    }
  },

  components: {
    RettiwtComment,
  }
};
</script>

<style lang="scss" scoped>
.articles {
  display: flex;
  flex-flow: column nowrap;
  gap: 2rem;
}

.post {
  width: 60rem;
  background-color: #424242;

  .postHeader {
    height: 3rem;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #424242;

    .username {
      font-size: 1.5rem;
    }

    .date {
      font-size: 0.75rem;
    }
  }

  img {
    width: 60rem;
  }

  .content,
  .counts {
    padding: 1rem;
  }
}

.writePost {
  width: 59rem;
  padding: .5rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
  background-color: rgb(125, 125, 125);
}
</style>
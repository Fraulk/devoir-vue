<template>
  <div class="comment">
    <div class="commentHeader">
      <span class="commentUser">{{ comment.pseudo }}</span>
      <span class="date">{{ new Date(comment.dt).toLocaleDateString() }}</span>
    </div>
    <div class="commentContent">{{ comment.contenu }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
};
</script>

<style lang="scss" scoped>
.comments {
  font-size: 1.5rem;
  margin-left: 0.5rem;

  .comment {
    margin: 1rem 0;
    padding: 0 1rem;

    .commentHeader {
      display: flex;
      justify-content: space-between;

      .commentUser {
        font-size: 1rem;
        font-weight: bold;
      }

      .date {
        font-size: 0.75rem;
      }
    }

    .commentContent {
      margin-top: 0.25rem;
      font-size: 1rem;
    }
  }
}
</style>
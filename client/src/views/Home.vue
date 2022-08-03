<template>
  <div>
    <Default></Default>
    <v-container>
      <v-alert
        border="left"
        close-text="Close Alert"
        color="green accent-4"
        dark
        dismissible
        v-if="this.$route.params.message"
      >
        {{ this.$route.params.message }}
      </v-alert>
      <v-row no-gutters>
        <v-col sm="4" class="pa-3" v-for="post in posts" :key="post.id">
          <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
            <v-row no-gutters>
              <v-col>
                <v-img max-width="120" :src="post.image"></v-img>
                <v-btn class="ml-4 mt-3" small outlined color="indigo">
                  {{ post.pokemon[2] }}
                </v-btn>
              </v-col>
              <v-col>
                <div>
                  <v-btn class="ma-1" style="width: 150px">{{
                    post.moves[0]
                  }}</v-btn>
                  <v-btn class="ma-1" style="width: 150px">{{
                    post.moves[2]
                  }}</v-btn>
                </div>
                <div>
                  <v-btn class="ma-1" style="width: 150px">{{
                    post.moves[1]
                  }}</v-btn>
                  <v-btn class="ma-1" style="width: 150px">{{
                    post.moves[3]
                  }}</v-btn>
                </div>
              </v-col>
            </v-row>
            <v-card-title>
              {{ post.nn }}
            </v-card-title>

            <v-card-text class="py-0">
              <v-row>
                <v-col>{{ post.ability }}</v-col>
                <v-col>{{ post.nature }}</v-col>
              </v-row>
              <br />
              <p>@{{ post.item ? `${post.item}` : "持ち物なし" }}</p>
              <br />
              <div class="d-flex justify-space-between align-center mr-0">
                <div class="align-center">投稿者: {{ post.username }}</div>
                <div v-if="post.username == $store.state.user.user.name">
                  <v-btn
                    color="success"
                    text
                    :to="{ name: 'edit-post', params: { id: post._id } }"
                    >編集</v-btn
                  >
                  <v-btn color="red" text @click="removePost(post._id)"
                    >削除</v-btn
                  >
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Default from "../components/Default.vue";
import API from "../api";
import router from "../../../client/src/router";
// import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      // users: [],
    };
  },

  // watch: {
  //   $route() {
  //     location.reload();
  //   },
  // },

  async created() {
    this.posts = await API.getAllPost();
  },
  methods: {
    async removePost(id) {
      const response = await API.deletePost(id);
      if (response) {
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
        location.reload();
      }
    },
  },
  components: { Default },
};
</script>

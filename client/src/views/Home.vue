<template>
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
          <v-row>
            <v-col>
              <v-img max-width="100" :src="post.image"></v-img>
              <v-btn class="ml-4 mt-3" small outlined color="indigo">
                {{ post.pokemon[2] }}
              </v-btn>
            </v-col>
            <v-col>
              <div>
                <v-btn class="ma-1">{{ post.moves[0] }}</v-btn>
                <v-btn class="ma-1">{{ post.moves[2] }}</v-btn>
              </div>
              <div>
                <v-btn class="ma-1">{{ post.moves[1] }}</v-btn>
                <v-btn class="ma-1">{{ post.moves[3] }}</v-btn>
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
            <p>@{{ post.item }}</p>
            <p>
              努力値: {{ post.en[0] }} - {{ post.en[1] }} - {{ post.en[2] }} -
              {{ post.en[3] }} - {{ post.en[4] }} - {{ post.en[5] }}
            </p>
            <p>{{ post.sex }}</p>
            <p>{{ post.color }}</p>
            <p>{{ post.no }}</p>
            <v-col sm="10" class="d-flex justify-end">
              <v-btn
                color="success"
                text
                :to="{ name: 'edit-post', params: { id: post._id } }"
                >編集</v-btn
              >
              <v-btn color="red" text @click="removePost(post._id)">削除</v-btn>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
// import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      users: [],
    };
  },

  async created() {
    this.posts = await API.getAllPost();
  },

  methods: {
    async removePost(id) {
      const response = await API.deletePost(id);
      this.$router.push({
        name: "home",
        params: { message: response.message },
      });
    },
  },
};
</script>

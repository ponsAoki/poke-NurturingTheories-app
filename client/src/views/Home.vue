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
            <v-row>
              <v-col>
                <v-img max-width="100" :src="post.image"></v-img>
                <v-btn class="ml-4 mt-3" small outlined color="indigo">
                  {{ post.pokemon[2] }}
                </v-btn>
              </v-col>
              <v-col>
                <div>
                  <v-btn class="ma-1" style="width: 156px">{{
                    post.moves[0]
                  }}</v-btn>
                  <v-btn class="ma-1" style="width: 156px">{{
                    post.moves[2]
                  }}</v-btn>
                </div>
                <div>
                  <v-btn class="ma-1" style="width: 156px">{{
                    post.moves[1]
                  }}</v-btn>
                  <v-btn class="ma-1" style="width: 156px">{{
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
              <p>
                努力値: {{ post.en[0] }} - {{ post.en[1] }} - {{ post.en[2] }} -
                {{ post.en[3] }} - {{ post.en[4] }} - {{ post.en[5] }}
              </p>
              <p>
                個体値: {{ post.IN[0] }} - {{ post.IN[1] }} - {{ post.IN[2] }} -
                {{ post.IN[3] }} - {{ post.IN[4] }} - {{ post.IN[5] }}
              </p>
              <p>
                実数値: {{ post.rn[0] }} - {{ post.rn[1] }} - {{ post.rn[2] }} -
                {{ post.rn[3] }} - {{ post.rn[4] }} - {{ post.rn[5] }}
              </p>
              <br />
              <p>投稿者: {{ post.username }}</p>
              <!-- <p>{{ post.sex }}</p>
            <p>{{ post.color }}</p>
            <p>{{ post.no }}</p> -->
              <div class="d-flex justify-end">
                <div>
                  <v-col sm="10" class="d-flex justify-end mr-0">
                    <v-btn
                      color="success"
                      text
                      :to="{ name: 'edit-post', params: { id: post._id } }"
                      >編集</v-btn
                    >
                    <v-btn color="red" text @click="removePost(post._id)"
                      >削除</v-btn
                    >
                  </v-col>
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
// import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      // users: [],
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
  components: { Default },
};
</script>

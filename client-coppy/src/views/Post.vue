<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-10 ma-10">
          <v-row>
            <v-col>
              <v-img max-width="150" :src="post.image"></v-img>
            </v-col>
            <v-col class="mt-5 ml-15">
              <p>
                個体値: {{ post.IN[0] }} - {{ post.IN[1] }} - {{ post.IN[2] }} -
                {{ post.IN[3] }} - {{ post.IN[4] }} - {{ post.IN[5] }}
              </p>
              <p>
                努力値: {{ post.en[0] }} - {{ post.en[1] }} - {{ post.en[2] }} -
                {{ post.en[3] }} - {{ post.en[4] }} - {{ post.en[5] }}
              </p>
              <p>
                実数値: {{ post.rn[0] }} - {{ post.rn[1] }} - {{ post.rn[2] }} -
                {{ post.rn[3] }} - {{ post.rn[4] }} - {{ post.rn[5] }}
              </p>
              <!-- <div>
                <v-btn class="ma-1" width="160px">{{ post.moves[0] }}</v-btn>
                <v-btn class="ma-1" width="160px">{{ post.moves[2] }}</v-btn>
              </div>
              <div>
                <v-btn class="ma-1" width="160px">{{ post.moves[1] }}</v-btn>
                <v-btn class="ma-1" width="160px">{{ post.moves[3] }}</v-btn>
              </div> -->
            </v-col>
          </v-row>
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{
                  post.pokemon[2]
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ post.nn }}</h3>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>{{ post.ability }}</v-col>
              <v-col>{{ post.nature }}</v-col>
            </v-row>
            <br />
            <p>@{{ post.item }}</p>
            <div>
              <v-btn class="ma-1" width="160px">{{ post.moves[0] }}</v-btn>
              <v-btn class="ma-1" width="160px">{{ post.moves[2] }}</v-btn>
            </div>
            <div>
              <v-btn class="ma-1" width="160px">{{ post.moves[1] }}</v-btn>
              <v-btn class="ma-1" width="160px">{{ post.moves[3] }}</v-btn>
            </div>
          </v-card-text>
          <v-col sm="10" class="d-flex justify-end">
            <v-btn
              color="success"
              text
              :to="{ name: 'edit-post', params: { id: post._id } }"
              >編集</v-btn
            >
            <v-btn color="red" text @click="removePost(post._id)">削除</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
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

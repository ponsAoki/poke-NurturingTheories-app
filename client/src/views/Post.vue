<template>
  <div>
    <Default></Default>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="pa-4 mx-auto d-flex justify-center">
          <v-card class="pa-10 ma-10" max-width="600">
            <v-row no-gutters class="d-flex align-center">
              <v-col>
                <v-img max-width="120" :src="post.image"></v-img>
                <v-btn class="ml-4 mt-3" small outlined color="indigo">
                  {{ post.pokemon[2] }}
                </v-btn>
              </v-col>
              <v-col max-width="300" class="mt-10">
                <v-textarea
                  v-model="post.memo"
                  label="投稿者のメモ"
                  outlined
                  type="text"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-card-title>
              {{ post.nn }}
            </v-card-title>

            <v-card-text class="py-0">
              <div class="d-flex">
                <div class="mr-16">
                  <div class="d-flex">
                    <div class="mr-5">{{ post.ability }}</div>
                    <div>{{ post.nature }}</div>
                  </div>
                  <br />
                  <p>@{{ post.item ? `${post.item}` : "持ち物なし" }}</p>
                  <p>
                    努力値: {{ post.en[0] }} - {{ post.en[1] }} -
                    {{ post.en[2] }} - {{ post.en[3] }} - {{ post.en[4] }} -
                    {{ post.en[5] }}
                  </p>
                  <p>
                    個体値: {{ post.IN[0] }} - {{ post.IN[1] }} -
                    {{ post.IN[2] }} - {{ post.IN[3] }} - {{ post.IN[4] }} -
                    {{ post.IN[5] }}
                  </p>
                  <p>
                    実数値: {{ post.rn[0] }} - {{ post.rn[1] }} -
                    {{ post.rn[2] }} - {{ post.rn[3] }} - {{ post.rn[4] }} -
                    {{ post.rn[5] }}
                  </p>
                </div>
                <div>
                  <!-- <div> -->
                  <div>
                    <v-btn class="ma-1" style="width: 150px">{{
                      post.moves[0]
                    }}</v-btn>
                  </div>
                  <div>
                    <v-btn class="ma-1" style="width: 150px">{{
                      post.moves[2]
                    }}</v-btn>
                  </div>
                  <div>
                    <v-btn class="ma-1" style="width: 150px">{{
                      post.moves[1]
                    }}</v-btn>
                  </div>
                  <div>
                    <v-btn class="ma-1" style="width: 150px">{{
                      post.moves[3]
                    }}</v-btn>
                  </div>
                  <!-- </div> -->
                </div>
              </div>
              <br />
              <!-- <p>あなた: {{ $store.state.user.user.name }}</p> -->
              <!-- <p>{{ post.sex }}</p>
            <p>{{ post.color }}</p>
            <p>{{ post.no }}</p> -->
              <!-- <div class="d-flex justify-space-between"> -->
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
              <!-- </div> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import API from "../api";
import Default from "../components/Default.vue";
// import {removePost} from "./Home.vue"
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
  components: { Default },
};
</script>

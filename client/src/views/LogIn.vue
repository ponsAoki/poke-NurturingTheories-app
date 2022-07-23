<template>
  <v-card width="400px" class="mx-auto mt-10">
    <v-cad-title>
      <h1 class="display-1">ログイン</h1>
    </v-cad-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="userName"
          prepend-icon="mdi-account-circle"
          label="ユーザ名"
        />
        <v-text-field
          v-model="password"
          prepend-icon="mdi-lock"
          append-icon="mdi-eye-off"
          v-bind:type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          label="パスワード"
        />
        <v-card-actions>
          <v-btn type="submit" class="info">ログイン</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import API from "../api";

export default {
  data: () => ({
    showPassword: false,
    userName: "",
    password: "",
  }),

  methods: {
    async login() {
      const res = await API.login({
        username: this.userName,
        password: this.password,
      });
      console.log(res.message);
    },
  },
};
</script>

<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> ポケモン my育成論工房 </v-list-item-title>
          <v-list-item-subtitle> メニュー </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ポケモン my育成論工房</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
// import Default from "./views/Default.vue";
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "育成論一覧", icon: "mdi-home", link: "/" },
      { title: "新しい育成論", icon: "mdi-note-plus", link: "/add-pokemon" },
      { title: "About", icon: "mdi-help-box", link: "/about" },
    ],
  }),
};
</script>

<template>
  <div>
    <Default></Default>
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto">
          <v-card class="pa-5">
            <v-card-title>新しい育成論</v-card-title>
            <v-divider></v-divider>
            <!-- <validation-observer ref="observer" v-slot="{ invalid }"> -->
            <v-form
              ref="form"
              @submit.prevent="submitForm"
              class="pa-5"
              enctype="multipart/form-data"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    class="font-medium shadow relative"
                    v-model="Pokemon"
                    :items="Pokemons"
                    :item-text="(item) => item.name + ' ' + item.form"
                    return-object
                    label="ポケモン"
                    @change="onInput"
                    :rules="[Rules]"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3" class="ml-10">
                  <v-select
                    label="Lv."
                    :items="lvs"
                    v-model.number="level"
                  ></v-select>
                </v-col>
              </v-row>
              <div v-if="tetsuLink">
                <a
                  v-bind:href="tetsuLinkVal"
                  alt="ポケモン徹底攻略様の育成論を参照"
                  target="_blank"
                  rel="noopener noreferrer"
                  >このポケモンの他の育成論</a
                >
                <p>参照元: 「ポケモン徹底攻略」様</p>
              </div>
              <v-row>
                <v-col cols="5" sm="5" class="mt-3">
                  <v-text-field
                    label="ニックネーム"
                    v-model="post.nn"
                  ></v-text-field>
                </v-col>
                <v-col cols="1"></v-col>
                <v-col class="ml-10 h-100">
                  <img :src="post.image" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="6" class="pt-7">
                  <v-btn-toggle v-model="post.sex_i">
                    <v-btn small>
                      <v-icon small>なし</v-icon>
                    </v-btn>

                    <v-btn small>
                      <v-icon small color="blue">♂</v-icon>
                    </v-btn>

                    <v-btn small>
                      <v-icon small color="red">♀</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols="1"></v-col>
                <v-col class="">
                  <v-switch
                    v-model="post.c_switch"
                    label="色違い"
                    color="success"
                    value="rare"
                    hide-details
                    @change="imgSrc"
                  ></v-switch>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-select
                    label="特性"
                    v-model="post.Ability"
                    :items="abilities"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-autocomplete
                    class="font-medium shadow relative"
                    v-model="post.Item"
                    :items="Items"
                    label="持ち物"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    label="性格"
                    :items="natures"
                    v-model="post.Nature"
                    item-text="name"
                    single-line
                    return-object
                    @change="nOCal"
                    :rules="rule2"
                    cols="12"
                    md="6"
                  ></v-select>
                </v-col>
              </v-row>
              <br />
              <v-col cols="12" sm="10">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th></th>
                      <th class="th">種族値</th>
                      <th class="th">個体値</th>
                      <th class="th">努力値</th>
                      <th class="th">実数値</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width="10%">H</td>
                      <td>
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.bn[0]"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.IN[0]"
                          @input="nhCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.en[0]"
                          @input="nhCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.rn[0]"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>A</td>
                      <td>
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.bn[1]"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.IN[1]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.en[1]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.rn[1]"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.bn[2]"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.IN[2]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.en[2]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.rn[2]"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.bn[3]"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.IN[3]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.en[3]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.rn[3]"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>D</td>
                      <td>
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.bn[4]"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.IN[4]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.en[4]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.rn[4]"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>S</td>
                      <td>
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.bn[5]"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.IN[5]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="ei"
                          v-model.number="post.en[5]"
                          @input="nOCal"
                        />
                      </td>
                      <td class="hd">
                        <input
                          type="text"
                          class="hi"
                          v-model.number="post.rn[5]"
                        />
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
              <br />
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="post.moves[0]"
                    :items="Moves"
                    label="技1"
                    :rules="rule1"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="post.moves[1]"
                    :items="Moves"
                    label="技2"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="post.moves[2]"
                    :items="Moves"
                    label="技3"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="post.moves[3]"
                    :items="Moves"
                    label="技4"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <br />
              <br />
              <v-col>
                <v-textarea
                  v-model="post.memo"
                  label="調整意図や役割などメモ"
                  outlined
                ></v-textarea>
              </v-col>

              <v-conainer class="d-flex align-center">
                <v-btn type="submit" color="primary">投稿</v-btn>
                <v-text class="ml-auto"
                  >投稿者: {{ $store.state.user.user.name }}</v-text
                >
              </v-conainer>
            </v-form>
            <!-- </validation-observer> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../../client-dev/src/store";
import API from "../api";
import Default from "../components/Default.vue";

export default {
  data() {
    return {
      rule1: [(v) => !!v || "入力必須です"],
      rule2: [(v) => !!v || "選択必須です"],
      success: false,
      Pokemons: [],
      Pokemon: [],
      tetsuLink: false,
      tetstuLinkIntro: "https://yakkun.com/swsh/theory/p",
      tetsuLinkVal: "",
      level: 50,
      post: {
        simPokesId: 0,
        nn: "",
        sex_i: 0,
        c_switch: "",
        image: "",
        Ability: "",
        Nature: "",
        Item: "",
        moves: [],
        bn: [100, 100, 100, 100, 100, 100],
        IN: [31, 31, 31, 31, 31, 31],
        en: [0, 0, 0, 0, 0, 0],
        rn: [],
        memo: "",
      },
      url: `https://pokeapi.co/api/v2/`,
      images: [],
      lvs: [50, 100],
      abilities: [],
      loading: false,
      Items: [],
      natures: [
        { name: "さみしがり" + "  " + "(A↑B↓)", n: ["", 1.1, 0.9, "", "", ""] },
        { name: "いじっぱり" + "  " + "(A↑C↓)", n: ["", 1.1, "", 0.9, "", ""] },
        { name: "やんちゃ" + "  " + "(A↑D↓)", n: ["", 1.1, "", "", 0.9, ""] },
        { name: "ゆうかん" + "  " + "(A↑S↓)", n: ["", 1.1, "", "", "", 0.9] },
        { name: "ずぶとい" + "  " + "(B↑A↓)", n: ["", 0.9, 1.1, "", "", ""] },
        { name: "わんぱく" + "  " + "(B↑C↓)", n: ["", "", 1.1, 0.9, "", ""] },
        { name: "のうてんき" + "  " + "(B↑D↓)", n: ["", "", 1.1, "", 0.9, ""] },
        { name: "のんき" + "  " + "(B↑S↓)", n: ["", "", 1.1, "", "", 0.9] },
        { name: "ひかえめ" + "  " + "(C↑A↓)", n: ["", 0.9, "", 1.1, "", ""] },
        { name: "おっとり" + "  " + "(C↑B↓)", n: ["", "", 0.9, 1.1, "", ""] },
        { name: "うっかりや" + "  " + "(C↑D↓)", n: ["", "", "", 1.1, 0.9, ""] },
        { name: "れいせい" + "  " + "(C↑S↓)", n: ["", "", "", 1.1, "", 0.9] },
        { name: "おだやか" + "  " + "(D↑A↓)", n: ["", 0.9, "", 1.1, "", ""] },
        { name: "おとなしい" + "  " + "(D↑B↓)", n: ["", "", 0.9, "", 1.1, ""] },
        { name: "しんちょう" + "  " + "(D↑C↓)", n: ["", "", "", 0.9, 1.1, ""] },
        { name: "なまいき" + "  " + "(D↑S↓)", n: ["", "", "", "", 1.1, 0.9] },
        { name: "おくびょう" + "  " + "(S↑A↓)", n: ["", 0.9, "", "", "", 1.1] },
        { name: "せっかち" + "  " + "(S↑B↓)", n: ["", "", 0.9, "", "", 1.1] },
        { name: "ようき" + "  " + "(S↑C↓)", n: ["", "", "", 0.9, "", 1.1] },
        { name: "むじゃき" + "  " + "(S↑D↓)", n: ["", "", "", "", 0.9, 1.1] },
        { name: "てれや" },
        { name: "がんばりや" },
        { name: "すなお" },
        { name: "きまぐれ" },
        { name: "まじめ" },
      ],
      Moves: [],
    };
  },
  async created() {
    this.Pokemons = await API.getPoke();
    const itemsData = await API.getItem();
    this.Items = itemsData.map((elm) => elm.name.japanese);
    const movesData = await API.getMove();
    this.Moves = movesData.map((elm) => elm.jname);
  },
  mounted() {
    console.log(this.$vuetify.breakpoint);
    this.nhCal();
    this.nOCal();
  },
  methods: {
    Rules(value) {
      if (value.length === 0) {
        return "入力必須です";
      } else {
        return true;
      }
    },
    onInput: function () {
      console.log(this.Pokemon);
      this.imgSrc();
      console.log("ここまで実行されてるよ");

      for (let i = 0; i < 2; i++) {
        if (this.Pokemon.abilities[i] || this.Pokemon.hidden_abilities[i]) {
          this.abilities.push(this.Pokemon.abilities[i]);
          this.abilities.push(this.Pokemon.hidden_abilities[i]);
        }
      }
      this.post.Ability = this.abilities[0];
      this.post.bn[0] = this.Pokemon.status.h;
      this.post.bn[1] = this.Pokemon.status.a;
      this.post.bn[2] = this.Pokemon.status.b;
      this.post.bn[3] = this.Pokemon.status.c;
      this.post.bn[4] = this.Pokemon.status.d;
      this.post.bn[5] = this.Pokemon.status.s;
      this.nhCal();
      this.nOCal();
    },
    tetsuLinkOn(i) {
      this.tetsuLink = true;
      const Pokemon = this.Pokemon;
      const num = Pokemon.no;
      const url = this.url + `pokemon-species/${num}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          // console.log(result);
          const vari = result.varieties[i];
          const res = vari.pokemon;
          if (vari.is_default == true) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}`;
          } else if (res.name.match("-mega")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}m`;
          } else if (res.name.match("-alola")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}a`;
          } else if (res.name.match("-galar")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}g`;
          } else if (res.name.match("-")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}f`;
          }
        });
    },
    async imgSrc() {
      const Pokemon = this.Pokemon;
      console.log(Pokemon._id);
      const url = this.url + `pokemon-species/${Pokemon.no}`;
      const pokemon = await axios.get(url);
      if (pokemon) {
        for (let i = 0; i < pokemon.data.names.length; i++) {
          const response = await this.simPokeByNum(Pokemon);
          if (response) {
            console.log(response[i]._id);
            if (response[i]._id == Pokemon._id) {
              this.tetsuLinkOn(i);
              this.post.simPokesId = i;
              const formI = await axios.get(
                pokemon.data.varieties[i].pokemon.url
              );
              if (formI) {
                this.imgJadge(formI.data);
                return this.simPokesId;
              }
            }
          }
        }
      }
    },
    async simPokeByNum(p) {
      const res = await API.getPokeByNum(p);
      return await res;
    },
    imgJadge(pokemon) {
      if (this.post.image === "") {
        this.post.image = pokemon.sprites.front_default;
      } else if (this.post.c_switch === "rare") {
        this.post.image = pokemon.sprites.front_shiny;
      } else if (this.post.c_switch === null) {
        this.post.image = pokemon.sprites.front_default;
      }
    },
    nhCal() {
      if (this.Pokemon.name !== "ヌケニン") {
        this.post.rn[0] =
          Math.floor(
            ((this.post.bn[0] * 2 +
              this.post.IN[0] +
              Math.floor(this.post.en[0] / 4)) *
              this.level) /
              100
          ) +
          this.level +
          10;
      } else {
        this.post.rn[0] = 1;
      }
    },
    nOCal() {
      let i = 1;
      while (i < 6) {
        if (this.post.Nature == "") {
          this.post.rn[i] =
            Math.floor(
              ((this.post.bn[i] * 2 +
                this.post.IN[i] +
                Math.floor(this.post.en[i] / 4)) *
                this.level) /
                100
            ) + 5;
        } else if (this.post.Nature !== "" && this.post.Nature.n[i] !== "") {
          this.post.rn[i] = Math.floor(
            (Math.floor(
              ((this.post.bn[i] * 2 +
                this.post.IN[i] +
                Math.floor(this.post.en[i] / 4)) *
                this.level) /
                100
            ) +
              5) *
              this.post.Nature.n[i]
          );
        } else if (this.post.Nature !== "" && this.post.Nature.n[i] == "") {
          this.post.rn[i] =
            Math.floor(
              ((this.post.bn[i] * 2 +
                this.post.IN[i] +
                Math.floor(this.post.en[i] / 4)) *
                this.level) /
                100
            ) + 5;
        }
        i++;
      }
    },
    // selectFile(file) {
    //   this.image = file[0];
    // },
    async submitForm() {
      const formData = new FormData();
      for (var key in this.Pokemon) {
        formData.append("pokemon", this.Pokemon[key]);
      }
      formData.append("simId", this.post.simPokesId);
      formData.append("no", this.Pokemon.no);
      formData.append("lv", this.level);
      formData.append("nn", this.post.nn);
      formData.append("image", this.post.image);
      formData.append("sex", this.post.sex_i);
      formData.append("color", this.post.c_switch);
      formData.append("ability", this.post.Ability);
      if (this.abilities.length > 0) {
        this.abilities.forEach((elm, index) => {
          formData.append("abilities[" + index + "]", elm);
        });
      } else {
        formData.append("abilities", []);
      }
      formData.append("nature", this.post.Nature.name);
      if (this.post.Item.length < 1) {
        formData.append("item", "");
      } else {
        formData.append("item", this.post.Item);
      }
      if (this.post.bn.length > 0) {
        this.post.bn.forEach((elm, index) => {
          formData.append("bn[" + index + "]", elm);
        });
      } else {
        formData.append("bn", []);
      }
      if (this.post.IN.length > 0) {
        this.post.IN.forEach((elm, index) => {
          formData.append("IN[" + index + "]", elm);
        });
      } else {
        formData.append("IN", []);
      }
      if (this.post.en.length > 0) {
        this.post.en.forEach((elm, index) => {
          formData.append("en[" + index + "]", elm);
        });
      } else {
        formData.append("en", []);
      }
      if (this.post.rn.length > 0) {
        this.post.rn.forEach((elm, index) => {
          formData.append("rn[" + index + "]", elm);
        });
      } else {
        formData.append("rn", []);
      }
      if (this.post.moves.length > 0) {
        this.post.moves.forEach((elm, index) => {
          formData.append("moves[" + index + "]", elm);
        });
      } else {
        formData.append("moves", []);
      }
      formData.append("memo", this.post.memo);
      formData.append("username", store.state.user.user.name);
      if (this.$refs.form.validate()) {
        const response = await API.addPost(formData);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      }
      this.Rules(this.Pokemon);
    },
  },
  watch: {
    Pokemon() {
      this.imgSrc();
    },
    level() {
      this.nhCal();
      this.nOCal();
    },
  },
  components: { Default },
};
</script>
<style scoped>
.data-table {
  max-width: none;
}
.th {
  text-align: center;
  margin: -5px;
}
.ht {
  white-space: nowrap;
  border-right: groove;
  width: 20%;
  text-align: center;
}
.hi {
  width: 23px;
  text-align: right;
  margin: -5px;
  pointer-events: none;
}
.ei {
  width: 28px;
  text-align: right;
  border-radius: 5px;
  border-style: outset;
  margin: -5px;
}
</style>

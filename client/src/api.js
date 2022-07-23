import axios from 'axios';
import router from './router/index'
const postUrl = '/api/post';
const searchUrl = '/api/search';
const registerUrl = '/api/register';
const loginUrl = '/api/login';


export default class API {
    // constructor()
    //ユーザー登録
    static async register(query) {
        const res = await axios.post(registerUrl, query)
            .catch(err => {
                console.log('接続エラー', err);
            })
        console.log(res);
        router.push('/')
        return res.data
    }

    //ログイン
    static async login(query) {
        const res = await axios.post(loginUrl, query)
            .catch(err => {
                console.log('接続エラー', err);
            })
        console.log(res);
        if (res.status == 200) {
            router.push('/')
        }
        return res.data
    }

    //to get all posts from the server
    static async getAllPost() {
            const res = await axios.get(postUrl);
            return res.data;
        }
        //to get single post by id
    static async getPostByID(id) {
            const res = await axios.get(`${postUrl}/${id}`);
            return res.data;
        }
        //to insert post into database
    static async addPost(post) {
            const res = await axios.post(postUrl, post);
            return res.data;
        }
        //to update post into database
    static async updatePost(id, post) {
            const res = await axios.patch(`${postUrl}/${id}`, post);
            return res.data;
        }
        //to delete a post
    static async deletePost(id) {
        const res = await axios.delete(`${postUrl}/${id}`);
        return res.data;
    }

    //search pokemon
    static async getPoke() {
            const res = await axios.get(`${searchUrl}/poke`);
            return res.data;
        }
        //search item
    static async getItem() {
            const res = await axios.get(`${searchUrl}/item`);
            return res.data;
        }
        //search move
    static async getMove() {
            const res = await axios.get(`${searchUrl}/move`);
            return res.data;
        }
        // search pokemon by id
    static async getPokeById(id) {
            const res = await axios.get(`${searchUrl}/${id}`)
            return res.data
        }
        //search pokemon by number
    static async getPokeByNum(post) {
        const res = await axios.post(`${searchUrl}/num`, post)
        return res.data
    }

}
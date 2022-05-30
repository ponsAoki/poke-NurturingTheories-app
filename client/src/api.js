import axios from 'axios';
const url = '/api/post';
const URL = '/api/search';


export default class API {
    //to get all posts from the server
    static async getAllPost() {
            const res = await axios.get(url);
            return res.data;
        }
        //to get single post by id
    static async getPostByID(id) {
            const res = await axios.get(`${url}/${id}`);
            return res.data;
        }
        //to insert post into database
    static async addPost(post) {
            const res = await axios.post(url, post);
            return res.data;
        }
        //to update post into database
    static async updatePost(id, post) {
            const res = await axios.patch(`${url}/${id}`, post);
            return res.data;
        }
        //to delete a post
    static async deletePost(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }

    //search pokemon
    static async getPoke() {
            const res = await axios.get(`${URL}/poke`);
            return res.data;
        }
        //search item
    static async getItem() {
            const res = await axios.get(`${URL}/item`);
            return res.data;
        }
        //search move
    static async getMove() {
            const res = await axios.get(`${URL}/move`);
            return res.data;
        }
        // search pokemon by id
    static async getPokeById(id) {
            const res = await axios.get(`${URL}/${id}`)
            return res.data
        }
        //search pokemon by number
    static async getPokeByNum(post) {
        const res = await axios.post(`${URL}/num`, post)
        return res.data
    }

}
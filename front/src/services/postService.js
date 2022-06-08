import axios from 'axios';
// import AuthService from './authService.js';
import AuthHeader from './authHeader.js';

// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = "http://localhost:3000/api/post/";


class PostService {
    // fonction d'affichage de tous les posts
    async getAll(){
        try {
            await axios.get(API_URL, {headers: AuthHeader()});            
        } catch (error) {
            console.log(error.message)
        }
    }
    // fonction de création d'un post 
    async createPost(post, image){
        try {
            if(image === 'undefined'){
                await axios.post(API_URL, post,{headers: AuthHeader()});           
            }else if ( post === 'undefined'){
                await axios.post(API_URL, image,{headers: AuthHeader()});           
            }else{
                const formData = new FormData();
                formData.append('post', JSON.stringify(post));
                formData.append('image', image); 
                await axios.post(API_URL, formData,{headers: AuthHeader()});           
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new PostService();
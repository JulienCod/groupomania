import axios from 'axios';
// import AuthService from './authService.js';
import AuthHeader from './authHeader.js';

// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = "http://localhost:3000/api/commentaire/";


class PostService {
    // fonction d'affichage de tous les posts
    async getById(idPost){
        try {
            return await axios.get(API_URL+idPost, {headers: AuthHeader()})
        } catch (error) {
            console.log(error.message)
        }
    }
    // fonction de création d'un post 
    async createComment(commentaire, image){
        try {
            if(!image){    
                const formData = new FormData();
                formData.append("commentaire", JSON.stringify(commentaire));
                await axios.post(API_URL, formData, {headers: AuthHeader()});           
            }else{                
                const formData = new FormData();
                formData.append("commentaire", JSON.stringify(commentaire));
                formData.append('image', image);
                await axios.post(API_URL, formData, {headers: AuthHeader()});           
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new PostService();
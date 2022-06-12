import axios from 'axios';
// import AuthService from './authService.js';
import AuthHeader from './authHeader.js';

// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = "http://localhost:3000/api/commentaire/";


class CommentService {
    // fonction d'affichage de tous les posts
    async getById(idComment){
        try {
            return await axios.get(API_URL+idComment, {headers: AuthHeader()})
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
            console.log(error.message);
        }
    }

    //fonction de suppression d'un commentaire
    async deleteComment(commentId){
        try {
            return await axios.delete(API_URL+commentId, {headers: AuthHeader()})
        } catch (error) {
            console.log(error.message);            
        }
    }

     //modification d'un post
     async modifyComment(commentId, comment, image){
        try {
            if(!image){    
                const formData = new FormData();
                formData.append("description", JSON.stringify(comment));
                return await axios.put(API_URL+commentId, formData, {headers: AuthHeader()});           
            }else{      
                const formData = new FormData();
                formData.append("description", JSON.stringify(comment));
                formData.append('image', image);
                return await axios.put(API_URL+commentId, formData,{headers: AuthHeader()})
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new CommentService();
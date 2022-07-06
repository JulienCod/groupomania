import axios from 'axios';
// import AuthService from './authService.js';
import AuthHeader from './authHeader.js';

// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = "http://localhost:3000/api/commentaire/";


class CommentService {
    // display commentId
    async getById(idComment){
        try {
            return await axios.get(API_URL+idComment, {headers: AuthHeader()})
        } catch (error) {
            alert(error.response.data.message);  
        }
    }

    // create comment
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
            alert(error.response.data.message);  
        }
    }

    //delete comment
    async deleteComment(commentId){
        try {
            return await axios.delete(API_URL+commentId, {headers: AuthHeader()})
        } catch (error) {
            alert(error.response.data.message);           
        }
    }

     //update comment
     async modifyComment(commentId, comment, image){
        try {
            if(!image){    
                const formData = new FormData();
                formData.append("description", JSON.stringify(comment));
                await axios.put(API_URL+commentId, formData, {headers: AuthHeader()});           
            }else{      
                const formData = new FormData();
                formData.append("description", JSON.stringify(comment));
                formData.append('image', image);
                await axios.put(API_URL+commentId, formData,{headers: AuthHeader()})
            }
        } catch (error) {
            alert(error.response.data.message);  
        }
    }
     // like comment
     async likePost(postId, data) {
        try{ 
            if(data.likeId){
                return await axios.put(API_URL+data.likeId+"/like", data, {headers: AuthHeader()});
            }else{
                return await axios.post(API_URL+postId+"/like", data, {headers: AuthHeader()});
            }  
        } catch (error) {
            alert(error.response.data.message);            
        }
    }
}

export default new CommentService();
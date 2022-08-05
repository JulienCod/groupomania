import axios from 'axios';
import AuthHeader from './authHeader.js';

const API_URL = `${process.env.REACT_APP_API_URL}`;

class CommentService {
    // display commentId
    async getById(idComment){
        try {
            return await axios.get(API_URL+"api/commentaire/"+idComment, {headers: AuthHeader()})
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
                await axios.post(API_URL+"api/commentaire/", formData, {headers: AuthHeader()});           
            }else{                
                const formData = new FormData();
                formData.append("commentaire", JSON.stringify(commentaire));
                formData.append('image', image);
                await axios.post(API_URL+"api/commentaire/", formData, {headers: AuthHeader()});           
            }
        } catch (error) {
            alert(error.response.data.message);  
        }
    }

    //delete comment
    async deleteComment(commentId){
        try {
            return await axios.delete(API_URL+"api/commentaire/"+commentId, {headers: AuthHeader()})
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
                await axios.put(API_URL+"api/commentaire/"+commentId, formData, {headers: AuthHeader()});           
            }else{      
                const formData = new FormData();
                formData.append("description", JSON.stringify(comment));
                formData.append('image', image);
                await axios.put(API_URL+"api/commentaire/"+commentId, formData,{headers: AuthHeader()})
            }
        } catch (error) {
            alert(error.response.data.message);  
        }
    }
     // like comment
     async likePost(postId, data) {
        try{ 
            if(data.likeId){
                return await axios.put(API_URL+"api/commentaire/"+data.likeId+"/like", data, {headers: AuthHeader()});
            }else{
                return await axios.post(API_URL+"api/commentaire/"+postId+"/like", data, {headers: AuthHeader()});
            }  
        } catch (error) {
            alert(error.response.data.message);            
        }
    }
}

export default new CommentService();
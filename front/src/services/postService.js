import axios from 'axios';
import AuthHeader from './authHeader.js';


const API_URL = `${process.env.REACT_APP_API_URL}`;


class PostService {
    //display all posts
    async getAll(){
        try {
            return await axios.get(API_URL+"api/post/", {headers: AuthHeader()});
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    //display one Post
    async getById(postId){
        try {
            return await axios.get(API_URL+"api/post/"+postId, {headers: AuthHeader()});
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    // create post
    async createPost(post, image){
        try {
            if(!image){    
                const formData = new FormData();
                formData.append("post", JSON.stringify(post));
                await axios.post(API_URL+"api/post/", formData, {headers: AuthHeader()});           
            }else{              
                const formData = new FormData();
                formData.append("post", JSON.stringify(post));
                formData.append('image', image);
                await axios.post(API_URL+"api/post/", formData, {headers: AuthHeader()
  });           
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    //delete post
    async deletePost(postId){
        try {
            return await axios.delete(API_URL+"api/post/"+postId ,{headers: AuthHeader()} );
        } catch (error) {
            console.log(error.response.data.message);            
        }
    }

    //update post
    async modifyPost(postId, post, image){
        try {
            if(!image){    
                const formData = new FormData();
                formData.append("description", JSON.stringify(post));
                await axios.put(API_URL+"api/post/"+postId, formData, {headers: AuthHeader()});           
            }else{      
                const formData = new FormData();
                formData.append("description", JSON.stringify(post));
                formData.append('image', image);
                await axios.put(API_URL+"api/post/"+postId, formData,{headers: AuthHeader()});
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    // like post
    async likePost(postId, data) {
        try{ 
            if(data.likeId){
                return await axios.put(API_URL+"api/post/"+data.likeId+"/like", data, {headers: AuthHeader()});
            }else{
                return await axios.post(API_URL+"api/post/"+postId+"/like", data, {headers: AuthHeader()});
            }
        } catch (error) {
            console.log(error.response.data.message);            
        }
    }
}

export default new PostService();
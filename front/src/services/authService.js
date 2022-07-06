import axios from 'axios';
import AuthHeader from './authHeader';
// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = "http://localhost:3000/api/auth/"

class AuthService {
    // fonction de connexion
    async login(user){
        try {
            const response = await axios.post(API_URL + "login", user);
            if (response.data.token) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                document.location.href = "groupomania";
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    //fonction de deconnexion
    logout(){
        sessionStorage.removeItem("user");
        document.location.href = "/";
    }

    // fonction d'inscription
    async signup(user, image) {
        try {
            if(image === undefined){   
                const formData = new FormData();
                formData.append('user', JSON.stringify(user));     
                await axios.post(API_URL + "signup", formData)
                document.location.href = "login";
             }else{
                 const formData = new FormData();
                 formData.append('user', JSON.stringify(user));
                 formData.append('image', image);
                  await axios.post(API_URL + "signup", formData)
                 document.location.href = "login";
             }
        } catch (error) {
            alert("L'adresse email est déjà utilisée") ;
        }
    }

    // // fonction de contrôle d'utilisateur
    getCurrentUser(){
        return JSON.parse(sessionStorage.getItem("user"))
    }

    async getById(userId){
        try {
            return await axios.get(API_URL+userId, {headers: AuthHeader()})
        } catch (error) {
            alert(error.message);
        }
    }

    async modifyProfils(userId, user, image){
        try {
            if(image === undefined){   
                const formData = new FormData();
                formData.append('user', JSON.stringify(user));     
                await axios.put(API_URL + userId, formData, {headers: AuthHeader()})
             }else{
                 const formData = new FormData();
                 formData.append('user', JSON.stringify(user));
                 formData.append('image', image);
                 await axios.put(API_URL + userId, formData, {headers: AuthHeader()})
             }            
        } catch (error) {   
           alert(error.response.data.message);
           return error.response.data.message
        }
    }

    async deleteUser(userId) {
        try {
            await axios.delete(API_URL+userId, {headers: AuthHeader()})
        } catch (error) {
            alert(error.message);
        }
    }
  
}

export default new AuthService();
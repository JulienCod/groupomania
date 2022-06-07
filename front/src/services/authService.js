import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = "http://localhost:3000/api/auth/"

class AuthService {
    // fonction de connexion
    async login(user){
        try {
            const response = await axios.post(API_URL + "login", user);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                document.location.href = "sauces";
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //fonction de deconnexion
    // logout(){
    //     localStorage.removeItem("user");
    //     document.location.href = "/";
    // }

    // fonction d'inscription
    async signup(user, image) {
        try {
            if(image === undefined){                
                await axios.post(API_URL + "signup", user)
                document.location.href = "login";
             }else{
                 const formData = new FormData();
                 formData.append('user', JSON.stringify(user));
                 formData.append('image', image);    
                // const options = {
                //     user :user,
                //     image :image
                // }
                 await axios.post(API_URL + "signup", formData)
                 document.location.href = "login";
             }
        } catch (error) {
            console.log(error.message)
        }
    }

    // // fonction de contrôle d'utilisateur
    // getCurrentUser(){
    //     return JSON.parse(localStorage.getItem("user"))
    // }

  
}

export default new AuthService();
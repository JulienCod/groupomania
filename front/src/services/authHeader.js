import AuthService from './authService';

// fonction de lecture du token présent dans le local storage pour l'envoyer dans les headers

export default function authHeader(){
    const user =  AuthService.getCurrentUser();

    if (user && user.token){
        return {'authorization': "bearer "+user.token}
    } else {
        return{}
    }
}
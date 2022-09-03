import axios from 'axios';
import AuthHeader from './authHeader';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

const API_URL = `${process.env.REACT_APP_API_URL}`;

class AuthService {

    async setup() {

        const token = window.sessionStorage.getItem('token');

        if (token) {
            const { exp: expiration } = jwt_decode(token);
            if (expiration * 1000 > new Date().getTime()) {
                await this.setAxiosToken(token);
            }
        }
    }

    async setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    isAuthenticated() {

        const token = window.sessionStorage.getItem("token");

        if (token) {

            const { exp: expiration } = jwt_decode(token);
            if (expiration * 1000 > new Date().getTime()) {
                return true;
            }
            return false;
        }
        return false;
    }

    async login(user) {
        try {
            const response = await axios.post(API_URL + "api/auth/login", user);
            if (response.data.token) {
                window.sessionStorage.setItem("token", response.data.token);
                this.setAxiosToken(response.data.token);
                window.sessionStorage.setItem("user", JSON.stringify(response.data.user));
                await Swal.fire({
                    icon: 'success',
                    title: 'Connexion réussi!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                document.location.href = "groupomania";
            }
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async logout() {
        await Swal.fire({
            icon: 'success',
            title: 'Déconnexion réussi!',
            showConfirmButton: false,
            timer: 2000,
        });
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        document.location.href = "/";
    }

    async signup(user, image) {
        try {
            const formData = new FormData();
            formData.append('user', JSON.stringify(user));
            if (image !== undefined) {
                formData.append('image', image);
            }
            await axios.post(API_URL + "api/auth/signup", formData)
            await Swal.fire({
                icon: 'success',
                title: 'Votre compte à bien été créé!',
                showConfirmButton: false,
                timer: 2000,
            });
            document.location.href = "login";
        } catch (error) {
            if (error.response.data.error.name === "SequelizeUniqueConstraintError");
            {
                return Swal.fire({
                    icon: 'warning',
                    title: "L'adresse email est déjà utilisée, veuillez vous connecter ou utiliser une autre adresse",
                    showConfirmButton: false,
                });
            }
        }
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem("user"))
    }

    async getById(userId) {
        try {
            return await axios.get(API_URL + "api/auth/" + userId, { headers: AuthHeader() })
        } catch (error) {
            console.log(error.message);
        }
    }

    async modifyProfils(userId, user, image) {
        try {
            const formData = new FormData();
            formData.append('user', JSON.stringify(user));
            if (image !== undefined) {
                formData.append('image', image);
            }
            await axios.put(API_URL + "api/auth/" + userId, formData, { headers: AuthHeader() })
            await Swal.fire({
                icon: 'success',
                title: 'Votre compte à bien été modifié!',
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            return Swal.fire({
                icon: 'warning',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async deleteUser(userId) {
        try {
            await axios.delete(API_URL + "api/auth/" + userId, { headers: AuthHeader() })
        } catch (error) {
            return Swal.fire({
                icon: 'warning',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }
}

export default new AuthService();
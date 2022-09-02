import axios from 'axios';
import AuthHeader from './authHeader';
import Swal from 'sweetalert2';

const API_URL = `${process.env.REACT_APP_API_URL}`;

class AuthService {

    async login(user) {
        try {
            const response = await axios.post(API_URL + "api/auth/login", user);
            if (response.data.token) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
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
        document.location.href = "/";
    }

    async signup(user, image) {
        try {
            if (image === undefined) {
                const formData = new FormData();
                formData.append('user', JSON.stringify(user));
                await axios.post(API_URL + "api/auth/signup", formData)
                document.location.href = "login";
            } else {
                const formData = new FormData();
                formData.append('user', JSON.stringify(user));
                formData.append('image', image);
                await axios.post(API_URL + "api/auth/signup", formData)
                document.location.href = "login";
            }
            await Swal.fire({
                icon: 'success',
                title: 'Votre compte à bien été créé!',
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            if (error.response.data.error.name === "SequelizeUniqueConstraintError");
            {
                return Swal.fire({
                    icon: 'warning',
                    title: "L'adresse email est déjà utilisé veuillez vous connecter ou utiliser une autre adresse",
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
            alert(error.message);
        }
    }

    async modifyProfils(userId, user, image) {
        try {
            if (image === undefined) {
                const formData = new FormData();
                formData.append('user', JSON.stringify(user));
                await axios.put(API_URL + "api/auth/" + userId, formData, { headers: AuthHeader() })
                await Swal.fire({
                    icon: 'success',
                    title: 'Votre compte à bien été modifié!',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                const formData = new FormData();
                formData.append('user', JSON.stringify(user));
                formData.append('image', image);
                await axios.put(API_URL + "api/auth/" + userId, formData, { headers: AuthHeader() })
                await Swal.fire({
                    icon: 'success',
                    title: 'Votre compte à bien été modifié!',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            console.log(error.response.data.message);
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
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = `${process.env.REACT_APP_API_URL}`;

class CommentService {

    async getById(idComment) {
        try {
            return await axios.get(API_URL + "api/commentaire/" + idComment)
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async createComment(commentaire, image) {
        try {
            const formData = new FormData();
            formData.append("commentaire", JSON.stringify(commentaire));
            if (image) {
                formData.append('image', image);
            }
            await axios.post(API_URL + "api/commentaire/", formData);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async deleteComment(commentId) {
        try {
            return await axios.delete(API_URL + "api/commentaire/" + commentId)
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async modifyComment(commentId, comment, image) {
        try {
            const formData = new FormData();
            formData.append("description", JSON.stringify(comment));
            if (image) {
                formData.append('image', image);
            }
            await axios.put(API_URL + "api/commentaire/" + commentId, formData);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async likeComment(commentId, data) {
        try {
            return await axios.post(API_URL + "api/commentaire/" + commentId + "/like", data);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }
}

export default new CommentService();
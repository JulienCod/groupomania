import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = `${process.env.REACT_APP_API_URL}`;


class PostService {

    async getAll() {
        try {
            return await axios.get(API_URL + "api/post/");
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async getById(postId) {
        try {
            return await axios.get(API_URL + "api/post/" + postId);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async createPost(post, image) {
        try {
            const formData = new FormData();
            formData.append("post", JSON.stringify(post));
            if (image) {
                formData.append('image', image);
            }
            await axios.post(API_URL + "api/post/", formData);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async deletePost(postId) {
        try {
            return await axios.delete(API_URL + "api/post/" + postId);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async modifyPost(postId, post, image) {
        try {
            const formData = new FormData();
            formData.append("description", JSON.stringify(post));
            if (image) {
                formData.append('image', image);
            }
            await axios.put(API_URL + "api/post/" + postId, formData);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }

    async likePost(postId, data) {
        try {
            return await axios.post(API_URL + "api/post/" + postId + "/like", data);
        } catch (error) {
            return Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
            });
        }
    }
}

export default new PostService();
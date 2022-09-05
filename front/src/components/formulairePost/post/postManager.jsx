import React, { useState, useEffect } from 'react';
import PostService from '../../../services/postService';
import AuthService from '../../../services/authService';
import Post from "./post/post";
import FormPost from '../newForm/formPost/FormPost';

export default function PostManager() {

    const [currentUserId, setCurrentUserId] = useState(AuthService.getCurrentUser());
    const [admin, setAdmin] = useState(AuthService.getAdmin());
    const [listPosts, setListPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(false);
        PostService.getAll()
            .then(async response => {
                if (response) {
                    const listPost = await response.data.map(post => {
                        let formatPublication = new Date(post.createdAt);
                        return {
                            index:  post.id,
                            post: {
                                postId: post.id,
                                description: post.description,
                                image: post.image,
                                datePublication: formatPublication.toLocaleDateString(),
                                hourPublication: formatPublication.toLocaleTimeString("en-GB",{hour: "numeric", minute: "numeric"}),
                                userId: post.userId,
                            },
                            user: {
                                userId: post.user.id,
                                firstname: post.user.firstname,
                                lastname: post.user.lastname,
                                avatar: post.user.avatar,
                            },
                            likePost: post.likePosts
                        }
                    })
                    setListPosts(await listPost);
                }
            })
    }, [refresh])

    const handleCallback = () => {
        setRefresh(true);
    }
    return (
        <>
            <FormPost parentCallback={handleCallback} />
            {
                listPosts.map(post => {
                    return (
                        <Post {...post} key={post.post.postId} parentCallback={handleCallback} currentUserId={currentUserId} admin={admin} />
                    )
                })
            }
        </>
    )
}
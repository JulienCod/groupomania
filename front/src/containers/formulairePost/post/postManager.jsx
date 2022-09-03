import React, { useState, useEffect } from 'react';
import PostService from '../../../services/postService';
import AuthService from '../../../services/authService';
import Post from "./post/post";
import FormPost from '../newForm/formPost/FormPost';

export default function PostManager() {

    const [loading, setLoading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(AuthService.getCurrentUser());
    const [admin, setAdmin] = useState(AuthService.getAdmin());
    const [listPosts, setListPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        PostService.getAll()
            .then(async response => {
                if (response) {
                    const listPost = await response.data.map(post => {
                        let utc = parseInt(post.createdAt.split('T')[1].split('.')[0].split(':')[0]) + 2;
                        utc = utc.toString()
                        let tabHour = post.createdAt.split('T')[1].split('.')[0].split(':')
                        tabHour.splice(0, 1, utc)
                        tabHour.pop()
                        let hour = tabHour.join(':')
                        return {
                            index: post.id,
                            post: {
                                postId: post.id,
                                description: post.description,
                                image: post.image,
                                datePublication: post.createdAt.split('T')[0].split('-').reverse().join('-'),
                                hourPublication: hour,
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
                    setListPosts(listPost);
                    setLoading(false);
                    setRefresh(false);
                }
            })
    }, [refresh])

    const handleCallback = () => {
        setRefresh(true);
    }
    return (
        <>
            {
                loading ?
                    <div>chargement ...</div>
                    :
                    <>
                        <FormPost parentCallback={handleCallback} />
                        {
                            listPosts.map(post => {
                                return (
                                    <Post {...post} key={post.post.postId}  parentCallback={handleCallback} currentUserId={currentUserId} admin={admin} />
                                )
                            })
                        }
                    </>
            }
        </>
    )
}
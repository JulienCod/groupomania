import useModal from "../../../Components/Modal/useModal";
import ModalCreatePost from "../../../Components/Modal/CreatePost/CreatePost";
import classes from"./Social.module.css";
import { useState, useEffect} from 'react';
import PostService from "../../../services/postService";
import Card from "../../../Components/post/card";

export default function Social(){
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData]= useState([]);
    const [refresh, setRefresh]= useState(0);
    const [dltPost, setDltPost]= useState(false);
   
    
    const refreshPosts = () => {setRefresh(refresh + 1)};
    useEffect(() =>{
        setIsLoading(true);
        const fetchData = async () =>{
            const response = await PostService.getAll()
            const listPost = await response.data.map(post => {
                let utc = parseInt(post.createdAt.split('T')[1].split('.')[0].split(':')[0])+2;
                utc = utc.toString()
                let tabHour = post.createdAt.split('T')[1].split('.')[0].split(':')
                tabHour.splice(0,1,utc)
                tabHour.pop()
                let hour = tabHour.join(':')
                return {
                    post: {
                        postId: post.id,
                        description: post.description,
                        image: post.image,
                        datePublication : post.createdAt.split('T')[0].split('-').reverse().join('-'),
                        hourPublication : hour,
                        userId: post.userId,
                    },
                    user:{
                        userId: post.user.id,
                        firstname: post.user.firstname,
                        lastname: post.user.lastname,
                        avatar: post.user.avatar,
                    },
                    likePost: post.likePosts
                }
            })
            setData(listPost);
            setDltPost(false);
            setIsLoading(false);
        }
        fetchData();
    },[refresh, dltPost])
    const { isShowing: isCreatePostFormShowed, toggle: toggleCreatePost } = useModal();


    return(
        <>
            <div>
                <button className={classes.modal_toggle} onClick={toggleCreatePost}>Ajouter un post</button>
            </div>
            {   
            
                data.length === 0?
                <div>Il n'y a pas de post</div>
                :
                <>
                    {
                    isLoading?
                    <div>Chargement</div>
                    :
                    <article className={classes.post__container}>
                        {data.map(item => (
                            <Card post={item} key={item.post.postId} refresh={refreshPosts}/>
                        ))}
                    </article>
                    }
                </>
            }
            <ModalCreatePost isShowing={isCreatePostFormShowed} hide={toggleCreatePost} refresh={refreshPosts} title="Exprimez-vous ..."/>
        </>
    )
}
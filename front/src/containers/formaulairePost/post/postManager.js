import React, {Component} from 'react';
import PostService from '../../../services/postService';
import NewForm from '../newForm/newForm';
import AuthService from '../../../services/authService';
import Post from "./post/post";

class PostManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPost:[],
            currentUserId:0,
            loading:false,
            admin:false,
        }
    }
    componentDidMount = async () => {
        let storage = AuthService.getCurrentUser();
        this.setState  ({
            loading: true,
            currentUserId: storage.userId,
            admin: storage.admin
        })

        await PostService.getAll()
        .then(async response => {
            if (response) {
                const listPost = await response.data.map(post => {
                    let utc = parseInt(post.createdAt.split('T')[1].split('.')[0].split(':')[0])+2;
                    utc = utc.toString()
                    let tabHour = post.createdAt.split('T')[1].split('.')[0].split(':')
                    tabHour.splice(0,1,utc)
                    tabHour.pop()
                    let hour = tabHour.join(':')
                    return {
                        index:post.id,
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
                listPost.reverse()
                 this.setState({
                    listPost,
                    loading:false,
                })
            }
        })    
    }

    handleCallback = () => {
        this.setState  ({
            loading: true,
        })
        this.componentDidMount();
    }

    render(){
        let listPost ="";
        listPost = this.state.listPost.map(post => {

            return(
                <Post {...post} key={post.post.postId} parentCallback={this.handleCallback} currentUserId={this.state.currentUserId} admin={this.state.admin}/>
            )
        })

        return(
            <>
                <NewForm parentCallback={this.handleCallback} status="post"/>
                {listPost}
            </>
        )
    }
}

export default PostManager;
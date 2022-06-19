class MainError extends Error{

    constructor(status, errorMessage){
        super()

        this.name = this.constructor.name
        this.message = errorMessage

        switch(this.constructor.name){
            case 'AuthentificationError':
                if (status == 404) {
                    this.status = 404;
                }else if(status == 401){
                    this.status = 401;
                }
                break
            case 'UserError':
                if (status == 404) {
                    this.status = 404;
                }else if(status ===403){
                    this.status = 403;
                }else if(status ===401){
                    this.status = 401;
                }
                break
            case 'PostError':
                if (status == 400) {
                    this.status = 400;
                }else if(status === 401){
                    this.status = 401;
                }
                else if (status == 404) {
                    this.status = 404;
                }
                break
            case 'CommentError':
                if (status == 400) {
                    this.status = 400;
                }else if(status === 401){
                    this.status = 401;
                }
                else if (status == 404) {
                    this.status = 404;
                }
                break
            case 'LikeError':
                if (status == 404) {
                    this.status = 404;
                }
                break
            default:
                console.log("Les autres");
        }
    }
} 
class AuthentificationError extends MainError{}
class UserError extends MainError{}
class PostError extends MainError{}
class CommentError extends MainError{}
class LikeError extends MainError{}

export {MainError,AuthentificationError, UserError, PostError, CommentError, LikeError}
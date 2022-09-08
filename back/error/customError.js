class MainError extends Error {

    constructor(status, errorMessage) {
        super()

        this.name = this.constructor.name
        this.message = errorMessage

        const errorStatus = (codeStatus) => {
            switch (codeStatus) {
                case 400:
                    return 400;
                    break;
                case 401:
                    return 401;
                    break;
                case 403:
                    return 403;
                    break;
                case 404:
                    return 404;
                    break;
                default:
                    return 'code erreur non répertoriée'
                    break;
            }
        }

        switch (this.constructor.name) {
            case 'AuthentificationError':
                this.status = errorStatus(status);
                break
            case 'UserError':
                this.status = errorStatus(status);
                break
            case 'PostError':
                this.status = errorStatus(status);
                break
            case 'CommentError':
                this.status = errorStatus(status);
                break
            default:
                console.log("Les autres");
        }
    }
}
class AuthentificationError extends MainError { }
class UserError extends MainError { }
class PostError extends MainError { }
class CommentError extends MainError { }

export { MainError, AuthentificationError, UserError, PostError, CommentError }

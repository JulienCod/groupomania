import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
import Post from './post.js';
import Commentaire from './commentaire.js';

const {DataTypes} = sequelize;
const User = Bd.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate :{
            isEmail: {msg: "l'adresse email est valide"}
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

User.hasMany(Post, {foreignKey: 'userId', onDelete: "Cascade"});
Post.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Commentaire, {foreignKey: 'userId', onDelete: "Cascade"});
Commentaire.belongsTo(User, {foreignKey: 'userId'});




export default User;
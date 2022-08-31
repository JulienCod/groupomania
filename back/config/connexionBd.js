import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export default new Sequelize(process.env.NAME_DATABASE, process.env.ID_CONNEXION, process.env.PWD_CONNEXION,
   {
      dialect: process.env.TYPE_DATABASE,
      host: process.env.HOST_CONNEXION,
   })
import express from 'express';
import Bd from './config/connexionBd.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

// Permet d'analyser le corps de la requête.
app.use(express.json()); 

// configuration des CORS doit être placé avant les routes de l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // au besoin remplacer l'étoile par le nom de domaine autorisé
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH', 'OPTIONS');
    next();
})

Bd.sync()
.then(console.log("Connexion à la base de données"))
.catch(error => console.log(error));

// configuration des routes

app.use('/api/auth', userRoutes);

export default app;
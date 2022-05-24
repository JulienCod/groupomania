import express from 'express';

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

// configuration des routes

/************************************************ */
//route test
app.use((req, res, next) => {
    res.status(200).json({message: 'serveur ok !'})
})
/************************************************ */

// app.use('/api/auth', userRoutes);


export default app;
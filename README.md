# Groupomania - Projet 7 de la formation développeur web - Openclassrooms

## A propos du projet

Ce projet consiste à créer un réseau social d'entreprise.

## Technologies utilisées

### FrontEnd

- React.js 

### BackEnd

- Node.js
- Express.js

### Base de données

- Mysql 

## Installation du projet

### Prérequis

- Avoir git d'installé
- Avoir nodeJs d'installé
- Avoir un serveur xampp d'installé pour la base de données

### Installation

1. Clonez le depot Github du projet

Ouvrez un nouveau terminal puis executez les commandes suivantes :

placez-vous dans le dossier ou vous souhaitez cloner le projet
git clone https://github.com/JulienCod/groupomania.git
cd groupomania # Se déplacer dans le dossier que vous venez de cloner


2. Initialisez la base de données

Démarrer xampp.

Lancer le serveur apache et mysql.

Cliquez sur le bouton Admin de mysql pour ouvrir phpmyadmin dans votre navigateur.

Accédez à l'onglet bases de données.

**Créer la base de donnée**

entrer le nom "groupomania" et cliquer sur créer

**importer le dump de la base de donnée**

Dans la base de donnée au nom de groupomania

aller dans l'ongler importer

cliquer sur choisir un fichier

rechercher le dossier ou vous avez cloner le dépot git et accéder au dossier base de donnée

sélectionner le fichier groupomania.sql et cliquez sur importer en bas de l'écran


3. Initialisez le Backend

Dans votre dossier groupomania à l'aide du terminal executez la commande suivante:

cd back # Se déplacer dans le dossier back

créer un fichier .env

copier-coller les lignes suivantes dans le fichier .env
saisir vos information et en supprimant le text et les étoiles **text**
NAME_DATABASE = **nom de la base de donnée**
ID_CONNEXION = **indiquez le identifiant de connexion a votre base de donnée**
PWD_CONNEXION = **indiquez le mot de passe de connexion a votre base de donnée**
TYPE_DATABASE = mysql
HOST_CONNEXION = localhost
TOKEN_KEY = **indiquez une clé secret pour le token**
URL= http://localhost:3000/

Dans votre terminal executer les lignes suivantes:

npm install # Installer les packages et dépendances nécessaires
npm start # Démarrer le serveur


4. Initialisez le frontend

Ouvrer un nouveau terminal 

executer la commande suivante:

cd front # Se déplacer dans le dossier front

créer un fichier .env 

copier-coller la ligne suivante:

REACT_APP_API_URL = http://localhost:3000/

Sur votre terminal exécuter les lignes suivantes:

npm install # Installer les packages et dépendances nécessaires
npm start # Démarrer l'application React


5. Accédez à l'application en local

Une fois le serveur backend démarrer sur le port 3000 et le serveur front démarrer vous pouvez y accédez à l'adresse suivante.

http://localhost:2000/

## Credits

Projet développé par Julien Crutain pour la formation Openclassrooms - Développeur Web
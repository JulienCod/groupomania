import React from 'react';
import classes from "./app.module.css";
import {Routes, Route} from "react-router-dom";
import Home from "./containers/pages/home/home";
import Erreur from './containers/pages/pageErreur/erreur';
import Erreur404 from './components/erreur/erreur404';
import HomePost from './containers/pages/homePost/homePost';
import PageProfils from './containers/pages/pageProfils/pageProfils';
import FormSignup from './containers/pages/authentification/Signup/FormSignup';
import FormLogin from './containers/pages/authentification/login/FormLogin';

function App() {
  return (
    <main className={classes.main}>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<FormSignup/>}/>
          <Route path="login" element={<FormLogin/>}/>
          <Route path="groupomania" element={<HomePost />}/>
          <Route path="profils" element={<PageProfils />} />
        <Route/>
        <Route path="*" element={<Erreur><Erreur404/></Erreur>}/>

      </Routes>
    </main>
  );
}

export default App;

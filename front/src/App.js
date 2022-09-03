import React, { useState } from 'react';
import classes from "./app.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/pages/home/home";
import Erreur from './containers/pages/pageErreur/erreur';
import Erreur404 from './components/erreur/erreur404';
import HomePost from './containers/pages/homePost/homePost';
import PageProfils from './containers/pages/pageProfils/pageProfils';
import FormSignup from './containers/pages/authentification/Signup/FormSignup';
import FormLogin from './containers/pages/authentification/login/FormLogin';
import AuthService from './services/authService';
import AuthContext from './context/AuthContext';

AuthService.setup();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }} >
      <main className={classes.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<FormSignup />} />
          <Route path="login" element={<FormLogin />} />
          <Route path="groupomania"  element={isAuthenticated? <HomePost /> : <FormLogin />} />
          <Route path="profils" element={isAuthenticated? <PageProfils /> : <FormLogin />} />
          <Route path="*" element={<Erreur><Erreur404 /></Erreur>} />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;

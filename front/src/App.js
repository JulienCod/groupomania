import React, { useState } from 'react';
import classes from "./app.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Erreur from './pages/pageErreur/erreur';
import Erreur404 from './components/erreur/erreur404';
import HomePost from './pages/homePost/homePost';
import PageProfils from './pages/pageProfils/pageProfils';
import FormSignup from './pages/authentification/Signup/FormSignup';
import FormLogin from './pages/authentification/login/FormLogin';
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

import React from 'react';
import classes from "./app.module.css";
import {Routes, Route} from "react-router-dom";
import Home from "./containers/pages/home/home";
import FormAuth from "./containers/pages/authentification/formAuth";
import Erreur from './containers/pages/pageErreur/erreur';
import Erreur404 from './components/erreur/erreur404';

function App() {
  return (
    <main className={classes.main}>
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<FormAuth mode="signup" />}/>
          <Route path="login" element={<FormAuth mode="login"/>} />

        <Route/>
        <Route path="*" element={<Erreur><Erreur404/></Erreur>} />

      </Routes>
    </main>
  );
}

export default App;

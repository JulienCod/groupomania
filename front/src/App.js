import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Containers/pages/home/Home";
import classes from "./app.module.css";
import FormSignup from "./Containers/pages/authentification/Signup/FormSignup";
import FormLogin from "./Containers/pages/authentification/login/FormLogin";

function App() {
  return (
    <main className={classes.main}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="signup" element={<FormSignup mode="signup"/>}/>
        <Route path="login" element={<FormLogin mode="login"/>}/>
      </Routes>
    </main>
  );
}

export default App;

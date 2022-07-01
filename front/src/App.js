import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Containers/pages/home/Home";
import classes from "./app.module.css"
function App() {
  return (
    <main className={classes.main}>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </main>
  );
}

export default App;

import React from "react";

import Login from "./Login";
import Register from "./Register";
import Mesto from "./Mesto";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const handleSingOut = () => {};

  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTolltipSuccess(true);
          history.push("/sing-in");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Header onSignOut={handleSingOut} />
        <Routes>
          <Route path="/" element={<Mesto />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

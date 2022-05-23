import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import userService from "../../utils/userService";

import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import FridgePage from "../FridgePage/FridgePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import PageHeader from "../../components/Header/Header";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  async function handleLogout() {
    try {
      userService.logout();
      setUser(null);
    } catch(err) {
      console.log(err, " from handleLogout");
    }

  }

  if (user) {
    return (
      <>
        <PageHeader user={user} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<FridgePage />} />
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout}  />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={<FridgePage user={user} />} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import userService from "../../utils/userService";
import useCurrentLocation from "../../hooks/useCurrentLocation";

import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import FridgesPage from "../FridgesPage/FridgesPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import FridgeFormPage from "../FridgeFormPage/FridgeFormPage";
import PageHeader from "../../components/Header/Header";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };
  const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);

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
          <Route path="/" element={<FridgesPage user={user} location={currentLocation} locationError={currentError} />} />
          <Route path="/addfridge" element={<FridgeFormPage user={user} />} />
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
        <Route path="/" element={<FridgesPage location={currentLocation} locationError={currentError} />} />
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

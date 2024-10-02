import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Home";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";
import AddPlace from "./components/AddPlace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/addPlace" element={<AddPlace/>}/>
      </Routes>
    </Router>
  )
}

export default App;
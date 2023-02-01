import './App.css'
import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";


const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<UserProfile/>} />
        </Routes>
    )
}

export default App

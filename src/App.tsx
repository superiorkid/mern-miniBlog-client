import './App.css'
import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import WriteNewArticle from "./pages/WriteNewArticle/WriteNewArticle";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DetailPost from "./pages/DetailPost/DetailPost";


const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/detail/:slug" element={<DetailPost/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/write-article" element={<WriteNewArticle/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}

export default App

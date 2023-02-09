import "./App.css";
import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import WriteNewArticle from "./pages/WriteNewArticle/WriteNewArticle";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DetailPost from "./pages/DetailPost/DetailPost";
import PublicRoute from "./utils/PublicRoute";
import Admin from "./pages/Admin/Admin";
import EditPost from "./pages/EditPost/EditPost";
import NotFound from "./pages/NotFound/NotFound";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:slug" element={<DetailPost />} />
      <Route path="/edit/:slug" element={<EditPost />} />
      <Route path="/write-article" element={<WriteNewArticle />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
        <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default App;

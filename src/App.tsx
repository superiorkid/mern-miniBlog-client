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
import ProtectedRoute from "./utils/ProtectedRoute";
import EditPost from "./pages/EditPost/EditPost";
import Tag from "./pages/Tag/Tag";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tag/:tag" element={<Tag />} />
      <Route
        path="/edit/:slug"
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />
      <Route path="/detail/:slug" element={<DetailPost />} />
      <Route
        path="/write-article"
        element={
          <ProtectedRoute>
            <WriteNewArticle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default App;

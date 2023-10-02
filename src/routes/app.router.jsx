import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/front/login";
import WithAuthDashboard from "../pages/auth/dashboard";
import WithAuthTodoList from "../pages/auth/todo";
import WithAuthAddTodo from "../pages/auth/todo/add";
import WithAuthEditTodo from "../pages/auth/todo/edit";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<WithAuthDashboard />} />
      <Route path="/dashboard/todos" element={<WithAuthTodoList />} />
      <Route path="/dashboard/todos/add" element={<WithAuthAddTodo />} />
      <Route path="/dashboard/todos/edit/:id" element={<WithAuthEditTodo />} />
    </Routes>
  );
};

export default AppRouter;

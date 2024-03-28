import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import GetUser from "../pages/GetUser";
import Task from "../pages/Task";
import Usertask from "../pages/Usertask";
import PrivateRoutes from "./PrivateRoutes";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} scrollToTop />
      <Route path="/signin" element={<Login />} scrollToTop />
      <Route path="/signup" element={<Register />} scrollToTop />
      <Route path="user-details" element={<GetUser />} />
      <Route
        path="/task"
        element={
          <PrivateRoutes>
            <Task />
          </PrivateRoutes>
        }
      />
      <Route
        path="/usertask"
        element={
          <PrivateRoutes>
            <Usertask />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default MainRoutes;

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { editUser, getUser } from "../redux/authReducer/action";
import Loading from "../components/Loading";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import EditNote from "@mui/icons-material/EditNote";

const GetUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((store) => store.authReducer);
  const shared = Cookies.get("savedtok");

  useEffect(() => {
    dispatch(getUser(shared)).then(() => {
      navigate(location.state, { replace: true });
    });
  }, [dispatch, shared]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div>
        {user.data && user.data.length > 0 ? (
          <Card
            sx={{
              minWidth: 275,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              boxShadow: "inherit",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                User Profile
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Name: {user.data[0].name}
              </Typography>
              <Typography variant="body2">
                Email: {user.data[0].email}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <p>No user available.</p>
        )}
      </div>
    </>
  );
};

export default GetUser;

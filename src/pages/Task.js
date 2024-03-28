// import React from 'react';
// import { Box, Paper, Typography, Checkbox, IconButton, ThemeProvider, Container, Avatar, TextField, FormControlLabel, Grid, Button, createTheme } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CssBaseline from "@mui/material/CssBaseline"
// import Link from "@mui/material/Link";

// const defaultTheme = createTheme();

// const Task = () => {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar> */}
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <Box
//           component="form"
//         //   onSubmit={handleSubmit}
//           noValidate
//           sx={{ mt: 1 }}
//         >
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             // onChange={(e) => {
//             //   setEmail(e.target.value);
//             // }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             // onChange={(e) => {
//             //   setPassword(e.target.value);
//             // }}
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
//     </Container>
//   </ThemeProvider>
//   );
// };

// export default Task;

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  Checkbox,
  IconButton,
  createTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { postTask } from "../redux/authReducer/action";
import { useNavigate } from "react-router-dom";
// Assuming you have your default theme defined in a separate file

const defaultTheme = createTheme();
const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
    };

    dispatch(postTask(taskData)).then(() => {
      console.log("Task added succesfully");
      navigate("/usertask");
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Task
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems="center"
            >
              {/* <Grid item xs={1}>
                <Checkbox />
              </Grid> */}
              <Grid item xs={10}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="task-text"
                  label="Task"
                  autoFocus
                  //   defaultValue={task.text}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="task-text"
                  label="Description"
                  autoFocus
                  rows={"8"}
                  multiline={true}
                  //   defaultValue={task.text}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              {/* <Grid item xs={1}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Grid> */}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create Task
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Task;

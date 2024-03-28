import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch} from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/authReducer/action';
import { Alert, AlertTitle } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {

  const [name , setName] = React.useState("")
  const [email , setEmail] = React.useState("")
  const [password , setPassword] = React.useState("")
  const [alertComponent, setAlertComponent] = React.useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
  
     const data = {
      name, 
      email,
      password
     }

     dispatch(register(data))
     .then(() => {
      
      const alertComponent = (
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setAlertComponent(null)}
        >
          <AlertTitle>Registration Succesfull!!</AlertTitle>
          <strong>Login and continue</strong>
        </Alert>
      );
      setAlertComponent(alertComponent);
      setTimeout(() => {
        
        navigate("/signin");
      }, 1000);
    })
    .catch((err) => {
      const alertComponent = (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setAlertComponent(null)}
        >
          <AlertTitle>Error</AlertTitle>
           {err.response.data.msg}
        </Alert>
      );
      setAlertComponent(alertComponent);
      setTimeout(() => {
        setAlertComponent(null);
      }, 3000);
    });
    

  };

  return (
    <>
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/signin"} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
      {alertComponent && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "50px",
            transform: "-moz-initial",
            zIndex: 9999,
          }}
        >
          {alertComponent}
        </div>
      )}
    </>
 
  );
}
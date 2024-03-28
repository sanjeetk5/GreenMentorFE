import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authReducer/action";
import Loading from "../components/Loading";
import { Alert, AlertTitle } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alertComponent, setAlertComponent] = React.useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.authReducer);
  console.log(isLoading);
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData))
      .then(() => {
        console.log("Login Succesfull");
        const alertComponent = (
          <Alert
            variant="filled"
            severity="success"
            onClose={() => setAlertComponent(null)}
          >
            <AlertTitle>Login Succesfull!!</AlertTitle>
            <strong>Redirecting you to homepage</strong>
          </Alert>
        );
        setAlertComponent(alertComponent);
        setTimeout(() => {
          navigate(location.state, { replace: true });
          navigate("/");
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
        }, 1000);
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/signup"} >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
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

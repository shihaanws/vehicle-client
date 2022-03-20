import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Shihaan</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [reset, setReset] = useState();
  let { id, token } = useParams();

  const handleSubmit = (event) => {

    event.preventDefault();
    const id1 = id;
    const token1 = token;
    // console.log(id1, token1);

    axios
      .post("http://localhost:1234" + `/reset-password/${id1}/${token1}`, {
        password1: password1.password1,
        password2: password2.password2,
      })
      .then((res) => {
          if(res.data.reset==true){
            setReset(true)
          }else{
            setReset(false)
          }
        console.log(res)
      
      });
  };


    

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => {
                  setPassword1({ password1: e.target.value });
                }}
                margin="normal"
                required
                fullWidth
                id="password1"
                label="New Password"
                name="New Password"
                autoComplete="password1"
                autoFocus
              />
              <TextField
                onChange={(e) => {
                  setPassword2({ password2: e.target.value });
                }}
                margin="normal"
                required
                fullWidth
                id="password2"
                label="Confirm password"
                name="password2"
                autoComplete="password2"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset password
              </Button>

              <Grid container>
                {reset == true ? (
                  <Link style={{ color: "green" }} href="/login" variant="body2">
                    Your password is reset. You can login now
                  </Link>
                ) : null}

                {reset == false ? (
                  <Grid style={{ color: "red" }} item xs>
                    Passwords dont match !
                  </Grid>
                ) : null}

                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://us.123rf.com/450wm/rawpixel/rawpixel1612/rawpixel161225699/67003949-change-your-password-privacy-policy-protection-security-system-concept.jpg?ver=6)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

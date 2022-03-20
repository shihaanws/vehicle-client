import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-toastify/dist/ReactToastify.css";

const axios = require("axios");

function App() {
  const [vehiclename, setVehiclename] = React.useState("");
  const [route, setRoute] = React.useState("");
  const [newVehiclename, setNewVehiclename] = React.useState("");
  const [newRoute, setNewRoute] = React.useState("");
  const [newDate, setNewDate] = useState("2014-08-18");
  const [vehicles, setVehicles] = useState([
    
    {
      userId: 6,
      vehiclename: "Xylo",
      route: "Chennai",
      date: "2022-12-25T00:00:00.000Z",
    },
  ]);

  const [ID, setID] = useState(0);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("2014-08-18");

  const [expanded, setExpanded] = React.useState(false);
  const [editClicked, setEditClicked] = useState(false);

  const handleVehicleName = (e) => {
    setVehiclename(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleChange = (event) => {
    setRoute(event.target.value);
  };

  const getAllVehicles = () => {
    axios
      .get("http://localhost:1234/getallvehicles")
      .then((response) => {
        setVehicles(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createVehicle = () => {
    axios
      .post(`http://localhost:1234/createvehicle/userId=2`, {
        vehiclename: newVehiclename,
        route: newRoute,
        date: newDate,
      })
      .then((res) => {
        console.log(res.data);
        toast("New Vehicle added");
      });
  };

  const deleteVehicle = (idey) => {
    console.log(idey);
    axios.get("http://localhost:1234" + `/delete/${idey}`).then((res) => {
      console.log(res);
    });
  };

  const updateVehicle = (idey) => {
    // console.log(username1);
    axios
      .put(`http://localhost:1234/updatevehicle/vehicleId=${idey}`, {
        vehiclename: vehiclename,
        route: route,
        date: date,
      })
      .then((res) => {
        console.log(res);
        toast("Vehicle details updated");
      });
  };

  const getAll = () => {};
  const logoutHandler = () => {
    setLogout(true);
  };

  useEffect(() => {
    getAllVehicles();
  });

  useEffect(() => {
    setName(localStorage.getItem("Username"));
    axios.get("http://localhost:1234/getallvehicles").then((res) => {
      console.log(res.data);
    });
  }, []);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <div>
      

      <div
        style={{
          display:"flex",
          backgroundColor: "darkviolet",
          height: "80px",
          position: "fixed",
          zIndex: "1000",
          top: "0",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection:"column",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px auto",
            backgroundColor: "white",
            width: "20%",
            height: "50%",
          }}
        >
          <h1> HI {name.toUpperCase()} ! </h1>

        </div>

        <Button variant="contained" color="error" style={{maxHeight:"40px" , margin:"15px"}}  onClick={()=>setLogout(true)} >Logout</Button>

      </div>

      {logout==true?<Redirect to="/login" />:null}

     
      
      <div style={{ display: "flex" }}>
        <Container>
          <div
            style={{
              height: "80px",
              position: "fixed",
              zIndex: "1000",
              top: "0",
              width: "100%",
              margin: "100px 0px 10px 10px",
            }}
          >
            <div>
              <h2>Add new vehicle Details</h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "300px",
              }}
            >
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Vehicle Name
                </InputLabel>

                <Select
                  style={{
                    maxHeight: "50px",
                    margin: "5px",
                    padding: "5px",
                  }}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newVehiclename}
                  label="Route"
                  onChange={(e) => {
                    setNewVehiclename(e.target.value);
                    console.log(newVehiclename);
                  }}
                >
                  <MenuItem value="Tata Indica">Tata indica</MenuItem>
                  <MenuItem value="Swift dzire">Swift dzire</MenuItem>
                  <MenuItem value="Xylo">Xylo</MenuItem>
                  <MenuItem value="Tavera">Tavera</MenuItem>
                </Select>
              </FormControl>

              {/* <TextField
                label="Vehicle Name"
                onChange={(e) => {
                  setNewVehiclename(e.target.value);
                  console.log(newVehiclename);
                }}
                value={newVehiclename}
                variant="filled"
              /> */}
              <br />

              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Route
                </InputLabel>

                <Select
                  style={{
                    maxHeight: "50px",
                    margin: "5px",
                    padding: "5px",
                  }}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newRoute}
                  label="Route"
                  onChange={(e) => {
                    setNewRoute(e.target.value);
                    console.log(newRoute);
                  }}
                >
                  <MenuItem value="Madurai">Madurai</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Salem">Salem</MenuItem>
                  <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                </Select>
              </FormControl>

              {/* <TextField
                onChange={(e) => {
                  setNewRoute(e.target.value);
                  console.log(newRoute);
                }}
                label="Route"
                value={newRoute}
                variant="filled"
              /> */}
              <br />
              <TextField
                onChange={(e) => {
                  setNewDate(e.target.value);
                }}
                variant="filled"
                id="date"
                value={newDate}
                label="Choose Route date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <Button
                onClick={() => {
                  createVehicle();
                }}
                variant="contained"
                color="success"
              >
                Add Vehicle
              </Button>
              <div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </Container>
        {editClicked == true ? (
          <Container>
            <div
              style={{
                height: "80px",
                position: "fixed",
                zIndex: "1000",
                top: "0",
                width: "100%",
                margin: "100px 0px 10px 10px",
              }}
            >
              <div>
                <h2>Edit vehicle Details</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "300px",
                }}
              >
                  <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Vehicle Name
                </InputLabel>

                <Select
                  style={{
                    maxHeight: "50px",
                    margin: "5px",
                    padding: "5px",
                  }}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={vehiclename}
                  label="Vehicle Name"
                  onChange={(e) => {
                    setVehiclename(e.target.value);
                    console.log(vehiclename);
                  }}
                >
                    <MenuItem value="Tata Indica">Tata indica</MenuItem>
                  <MenuItem value="Swift dzire">Swift dzire</MenuItem>
                  <MenuItem value="Xylo">Xylo</MenuItem>
                  <MenuItem value="Tavera">Tavera</MenuItem>
                </Select>
              </FormControl>
                {/* <TextField
                  label="Vehicle Name"
                  onChange={(e) => {
                    setVehiclename(e.target.value);
                    console.log(vehiclename);
                  }}
                  value={vehiclename}
                  variant="filled"
                /> */}
                <br />
                <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Route
                </InputLabel>

                <Select
                  style={{
                    maxHeight: "50px",
                    margin: "5px",
                    padding: "5px",
                  }}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={route}
                  label="Route"
                  onChange={(e) => {
                    setRoute(e.target.value);
                    console.log(route);
                  }}
                >
                  <MenuItem value="Madurai">Madurai</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Salem">Salem</MenuItem>
                  <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                </Select>
              </FormControl>
                {/* <TextField
                  onChange={(e) => {
                    setRoute(e.target.value);
                    console.log(route);
                  }}
                  label="Route"
                  value={route}
                  variant="filled"
                /> */}
                <br />

                <TextField
                  onChange={(e) => {
                    setDate(e.target.value);
                    console.log(date);
                  }}
                  variant="filled"
                  id="date"
                  value={date}
                  label="Choose Route date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <Button
                  onClick={() => {
                    updateVehicle(ID);
                    setEditClicked(false);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Edit Vehicle blue
                </Button>
              </div>
            </div>
          </Container>
        ) : null}

        <Container style={{ margin: "10px " }}>
          <div style={{ margin: "50px auto" }}>
            {vehicles.map((ele, index) => {
              return (
                <Card
                  style={{ backgroundColor: "grey", margin: "20px auto" }}
                  sx={{ maxWidth: 345 }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={ele.route}
                    subheader={ele.date}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <h2 style={{ color: "black" }}>{ele.vehiclename}</h2>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      style={{ color: "green" }}
                      expand={expanded}
                      onClick={() => {
                        setID(ele.id);
                        // console.log(ele.id);
                        setEditClicked(true);
                        // handleExpandClick(ID)
                      }}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        // onClick={()=>console.log(ele.id)}
                      >
                        Edit Vehicle
                      </Button>
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Vehicle Name
                            </InputLabel>
                            <Select
                              style={{
                                maxWidth: "200px",
                                maxHeight: "50px",
                                margin: "5px",
                                padding: "5px",
                              }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={vehiclename}
                              label="Vehicle Name"
                              onChange={handleVehicleName}
                            >
                              <MenuItem value="Tata Indica">
                                Tata indica
                              </MenuItem>
                              <MenuItem value="Swift dzire">
                                Swift dzire
                              </MenuItem>
                              <MenuItem value="Xylo">Xylo</MenuItem>
                              <MenuItem value="Tavera">Tavera</MenuItem>
                            </Select>
                          </FormControl>
                          <br />

                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Route{" "}
                            </InputLabel>
                            <Select
                              style={{
                                maxWidth: "200px",
                                maxHeight: "50px",
                                margin: "5px",
                                padding: "5px",
                              }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={route}
                              label="Route"
                              onChange={handleChange}
                            >
                              <MenuItem value="Madurai">Madurai</MenuItem>
                              <MenuItem value="Chennai">Chennai</MenuItem>
                              <MenuItem value="Salem">Salem</MenuItem>
                              <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <TextField
                            style={{
                              maxWidth: "200px",
                              maxHeight: "50px",
                              margin: "5px",
                              padding: "5px",
                            }}
                            id="date"
                            label="Choose Route date"
                            type="date"
                            // defaultValue={date}
                            onChange={handleDate}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <Button
                            style={{
                              maxHeight: "40px",
                              margin: "20px",
                              padding: "5px",
                            }}
                            color="primary"
                            variant="contained"
                          >
                            Submit
                          </Button>
                        </div>
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}
export default App;

import React, { useState } from "react";
const axios = require("axios");

function App() {
  const [users, setUsers] = useState([
    { id: 6, password: "", username: "gokul" },
  ]);

  const [username1, setUsername1] = useState("testname");

  const getAllUsers = () => {
    axios
      .get("http://localhost:1234/getAllUsers")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        console.log(username1.username);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createUser = () => {
    axios
      .post("http://localhost:1234" + "/login", {
        username: username1.username,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const deleteUser = (idey) => {
    console.log(idey);
    axios.post("http://localhost:1234" + `/delete/${idey}`).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setUsername1({ username: e.target.value });
        }}
      />
      <button onClick={createUser}>Add user</button>

      {users.map((ele, index) => {
        return (
          <p id={index}>
            {ele.username} --- {index}
            <button
              id={index + 1}
              onClick={(e) => {
                deleteUser(e.target.id);
              }}
            >
              Delete me
            </button>
          </p>
        );
      })}
      <button onClick={getAllUsers}>View all users</button>
    </div>
  );
}
export default App;

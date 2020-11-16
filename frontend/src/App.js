import React, { useState } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { userContext } from "./context/userContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import EditProfile from "./components/EditProfile";
import Settings from "./components/Settings";

function App() {
  const persistentUserData = localStorage.getItem("user-data");
  const persistentSearchUser = localStorage.getItem("search-user");
  const [userData, setUserData] = useState(JSON.parse(persistentUserData));
  const [searchUser, setSearchUser] = useState(
    JSON.parse(persistentSearchUser)
  );

  return (
    <Router>
      <userContext.Provider
        value={{ userData, setUserData, searchUser, setSearchUser }}
      >
        <div className="app">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={userData ? Home : Login} />
            <Route path="/profile" component={userData ? Profile : Login} />
            <Route path="/users" component={userData ? Users : Login} />
            <Route
              path="/user/:user"
              component={userData ? SingleUser : Login}
            />
            <Route path="/edit" component={userData ? EditProfile : Login} />
            <Route path="/settings" component={userData ? Settings : Login} />
          </Switch>
        </div>
      </userContext.Provider>
    </Router>
  );
}

export default App;

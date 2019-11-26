import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute";
import MakeQuiz from "./Components/Home/MakeQuiz";
import UpdateQuiz from "./Components/Home/UpdateQuiz";
import UpdatingQuiz from "./Components/Home/UpdateQuiz/UpdatingQuiz";
import Admin from "./Components/admin/admin";
// import AdminRegister from "./Components/admin/adminRegister";
import AdminLogin from "./Components/admin/adminLogin";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/admin" component={Admin} />
            {/* <Route exact path="/adminRegister" component={AdminRegister} /> */}
            <Route exact path="/adminLogin" component={AdminLogin} />
            <PrivateRoute exact path="/makeQuiz" component={MakeQuiz} />
            <PrivateRoute exact path="/updateQuiz" component={UpdateQuiz} />
            <PrivateRoute exact path="/updatingQuiz" component={UpdatingQuiz} />
            <PrivateRoute path="/home" component={Home} />
            <Redirect to={localStorage.path || "/home"} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);

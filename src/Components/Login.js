import React, { Component } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { Link as Routerlink, Redirect } from "react-router-dom";
import firebase from "../Config/firebase";

class Login extends Component {
  state = {
    signup: false,
    userName: "",
    email: "",
    password: "",
    loc: "/"
  };

  showSignup = () => {
    this.setState({ signup: true });
  };
  showLogin = () => {
    this.setState({ signup: false });
  };
  onChangeEmail = e => {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  };
  onChangePass = e => {
    console.log(e.target.value);
    this.setState({ password: e.target.value });
  };

  onSubmit = async () => {
    const { email, password } = this.state;
    // const data = JSON.parse(localStorage.getItem("userData"));
    // console.log(data);
    if (email === "" || password === null) {
      Swal.fire("Oops...", "please fill the empty fields", "error");
    } else {
      let userId = "";
      try {
        await firebase.signInWithFirebase(email, password).then(cred => {
          console.log("cred", cred.user.uid);
          userId = cred.user.uid;
          firebase.setUser(cred.user.uid);
        });
        console.log(userId);

        let checkUser = await firebase.checkUser(userId);
        console.log(checkUser);
        console.log(checkUser.userType);
        console.log("success");
        if (checkUser.userType == "user") {
          localStorage.isAuthenticated = true;
          this.setState({ loc: "/home" });
          Swal.fire("Success", "Successfully LoggedIn", "success");
        } else {
          Swal.fire("Error", "Please Enter Correct Credentials", "error");
        }
      } catch (e) {
        console.log(e);
        Swal.fire("Error..", e.message, "error");
      }
    }
  };

  renderLogin = () => {
    return (
      <div className="">
        <Navbar />
        <form
          className="col s12 ml-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onSubmit={e => {
            e.preventDefault();
            this.onSubmit();
          }}
        >
          <h2 className="adminHeading">Login</h2>
          <div className="row">
            <div className="input-field col  ml-3" style={{ width: "280px" }}>
              <input
                id="email"
                type="email"
                className="validate"
                // placeholder="Enter Email"
                onChange={this.onChangeEmail}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col  ml-3" style={{ width: "280px" }}>
              <input
                id="password"
                type="password"
                className="validate"
                // placeholder="Enter Password"
                onChange={this.onChangePass}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={() => this.onSubmit}
          >
            Submit
            <i className="material-icons right"></i>
          </button>
          <p id="signupText">
            don't have an account?{" "}
            <Routerlink to="/register">Go to Register</Routerlink>
            <br />
            <Routerlink to="/adminLogin">Go to Admin Panel</Routerlink>
          </p>
        </form>
      </div>
    );
  };

  render() {
    if (localStorage.isAuthenticated) {
      return <Redirect to="/home" />;
    }
    // const { signup } = this.state;
    return (
      <div>
        {this.renderLogin()}
        <Redirect to={this.state.loc} />
      </div>
    );
  }
}

export default Login;

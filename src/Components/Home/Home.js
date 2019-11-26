import React, { Component } from "react";
import Navbar from "../Navbar";
import firebase from "../../Config/firebase";
import Swal from "sweetalert2";
import withPath from "../HOC/withPath";
import Quizlist from "./Quizlist";

// import { Link as RouterLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { loc: "/home" };
  }
  logOutFunc = async () => {
    try {
      console.log("logout running");
      await firebase.logOut().then(() => {
        // localStorage.path = "/";
        localStorage.clear();
        this.props.history.push("/");
        Swal.fire("Success", "Success fully LoggedOut", "success");
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <Navbar />

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          style={{ margin: "10px" }}
          onClick={() => this.logOutFunc()}
        >
          Logout
          <i className="material-icons right"></i>
        </button>

        {/* <RouterLink to="/makeQuiz" style={{ color: "white" }}>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            style={{ margin: "10px" }}
            name="action"
          >
            Make Quiz
          </button>
        </RouterLink>

        <RouterLink to="/updateQuiz" style={{ color: "white" }}>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            style={{ margin: "10px" }}
            name="action"
          >
            Update Quiz
          </button>
        </RouterLink> */}

        <h1>QUIZ PAGE</h1>
        <Quizlist logOut={this.logOutFunc} />
      </div>
    );
  }
}

export default withPath(Home);

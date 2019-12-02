import React, { Component } from "react";
import Navbar from "../Navbar";
import firebase from "../../Config/firebase";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import { getQuizes, getAssignQuizes } from "../../store/actions";
class admin extends Component {
  constructor(props) {
    super(props);

    this.state = { loc: "/admin", users: [], assign: false, back: false };
  }
  logOutFunc = async () => {
    try {
      console.log("logout running");
      await firebase.logOut().then(() => {
        localStorage.clear();
        this.props.history.push("/");
        Swal.fire("Success", "Successfully LoggedOut", "success");
      });
      // localStorage.path = "/";
    } catch (e) {
      console.log(e);
      Swal.fire("Error..!", e.message, "error");
    }
  };

  getUsers = async () => {
    const users = await firebase.getUsers();
    console.log(users);
    // const data = await users.docs.data();
    // console.log(data);
    this.setState({ users: users });
  };

  componentWillMount = async () => {
    await this.getUsers();
    console.log(this.state);
  };

  componentDidMount = async () => {
    await this.props.getQuiz();
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  renderQuizToAssign = () => {
    return this.props.quiz.map((items, indx) => (
      <div className="flip-card" key={indx}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={items.profilePic} alt="logo" id="cardLogo" />
          </div>
          <div className="flip-card-back">
            <h3>{items.mainTitle}</h3>
            <p>This Covers all quizes related to {items.quizOne.description}</p>

            <button
              className="btn waves-effect waves-light purple"
              style={{ margin: "0px 5px" }}
              type="submit"
              id="takeQuizBtn"
              onClick={() => {
                console.log("Update=>", indx);
                console.log("user", this.state.users);
                this.setState({ assign: true, id: items.id, back: true });
                // this.updateQuizfunc(indx, this.props.id);
              }}
            >
              Assign Quiz
            </button>
          </div>
        </div>
      </div>
    ));
  };

  renderUserList = () => {
    console.log(this.state.users);
    console.log(this.state.id);
    let userlists = [];
    this.state.users.filter(user =>
      Object.keys(user.quizAssigned || {}).map(
        key =>
          parseFloat(key) === this.state.id
            ? userlists.push(user.uid)
            : console.log("no match")
        // console.log(key)
      )
    );
    console.log(userlists);
    {
      const userList = this.state.users
        ? this.state.users.map((user, index) => {
            console.log(user);
            if (!userlists.includes(user.uid)) {
              if (user.userType == "user") {
                return (
                  <div key={index} style={{ margin: "10px" }}>
                    <li style={{ listStyleType: "none" }}>
                      <div>
                        {`
                      UserName:${user.userName},
                      Email:${user.email}`}
                        {console.log(this.state.id)}
                        <button
                          className="btn waves-effect waves-light pink"
                          type="submit"
                          style={{ margin: "0px 10px" }}
                          onClick={() =>
                            // console.log(this.state.id, " quiz assign to ", user)
                            firebase.assignQuizToUser(this.state.id, user)
                          }
                        >
                          Assign Quiz
                        </button>
                      </div>
                    </li>
                  </div>
                );
              }
            } else {
              console.log(user.quizAssigned[this.state.id]);
              let data = new Promise(async (resolve, rej) => {
                await firebase
                  .getGivenQuiz(
                    parseFloat(user.quizAssigned[this.state.id].quizId)
                  )
                  .then(res => {
                    console.log(res);
                    resolve(res);
                    return res;
                  });
              });
              data.then(dat => {
                console.log(dat);
                return dat;
              });
              console.log(data);
              if (
                user.quizAssigned[this.state.id].finalScore ||
                user.quizAssigned[this.state.id].finalScore == "0"
              ) {
                return (
                  <div
                    key={Math.random()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div className="row">
                      <div className="m6">
                        <div className="card blue-grey darken-1">
                          <div className="card-content white-text">
                            <span className="card-title">
                              Quiz id: {user.quizAssigned[this.state.id].quizId}
                            </span>
                            <p>User Email: {user.email}</p>
                            <p>Username: {user.userName}</p>
                            <p>
                              Marks Obtained:
                              {user.quizAssigned[this.state.id].finalScore}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else if (!user.quizAssigned[this.state.id].quizTaken) {
                console.log("Show quiz assign but not taken");
                console.log(user.quizAssigned[this.state.id]);
                return (
                  <div key={index} style={{ margin: "10px" }}>
                    <li style={{ listStyleType: "none" }}>
                      <div>
                        {`
                      UserName:${user.userName},
                      Email:${user.email}
                      Quiz-Given:${
                        user.quizAssigned[this.state.id].quizTaken
                      } `}
                        {console.log(this.state.id)}
                      </div>
                    </li>
                  </div>
                );
              }
            }
          })
        : null;
      return userList;
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

        {this.state.back ? (
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            style={{ margin: "10px" }}
            onClick={() => this.setState({ assign: false, back: false })}
          >
            Back
            <i className="material-icons right"></i>
          </button>
        ) : null}

        {!this.state.back ? (
          <span>
            <RouterLink to="/makeQuiz" style={{ color: "white" }}>
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
            </RouterLink>
          </span>
        ) : null}

        {/* <button
          className="btn waves-effect waves-light"
          type="submit"
          onClick={this.props.getQuiz}
        >
          Get Redux Quizes
        </button> */}
        <br />

        {!this.state.assign ? this.renderQuizToAssign() : this.renderUserList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    quiz: state.loadQuiz.quizes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuiz: data => {
      dispatch(getQuizes(data));
    },
    getAssignQuizes: data => {
      dispatch(getAssignQuizes(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(admin);

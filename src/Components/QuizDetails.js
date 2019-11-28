import React, { Component } from "react";
import "../App.css";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import Quizpage from "./Quizpage";

import firebase from "../Config/firebase";
import { currQuizObj, currQuizTitle, startQuiz } from "../store/actions"; //quizTakenArr

class QuizDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: false,
      enteredKey: null,
      // currQuizTitle: null,
      currentQuizObj: null
    };
    this.back = this.back.bind(this);
  }

  componentWillMount() {
    let startQuiz = JSON.parse(localStorage.getItem("startQuiz"));
    // let currentQuizObj = JSON.parse(localStorage.getItem("currentQuizObj"));

    // this.setState({ startQuiz, currentQuizObj });
    this.setState({ startQuiz });
  }

  back() {
    if (this.state.startQuiz) {
      this.setState({ startQuiz: false, currentQuizObj: null });
      localStorage.setItem("currentQuizObj", false);
      localStorage.setItem("startQuiz", false);
    } else {
      this.props.back();
    }
  }

  startQuiz(title) {
    console.log(this.props.selectedQuiz);

    this.setState({ startQuiz: true });
    // localStorage.setItem("startQuiz", true);
    this.setState({ currQuizTitle: title });

    this.props.currQuizTitle(title);
    this.props.startQuiz(title);
  }

  checkKey() {
    console.log(this.props);
    const { enteredKey } = this.state;
    const currentQuizTitle = this.props.currentQuizTitle;
    const currentQuizArr = this.props.selectedQuiz;
    console.log(currentQuizArr);
    // let quizTaken = JSON.parse(localStorage.getItem("quizTaken")) || [];
    let quizTaken = this.props.quizTaken || [];
    console.log("check");
    console.log(currentQuizTitle);
    for (let quiz of currentQuizArr.quizOne.questions) {
      if (typeof currentQuizArr.quizOne === "object") {
        if (currentQuizArr.quizOne.title === currentQuizTitle) {
          console.log(currentQuizArr.quizOne);
          if (currentQuizArr.quizOne.quizKey === enteredKey) {
            // alert("correct");
            Swal.fire("Correct", "", "success");
            currentQuizArr.quizOne.done = true;
            // let saveQuiz = JSON.stringify(quiz);
            // localStorage.setItem("currentQuizObj", saveQuiz);
            this.setState({ currentQuizObj: currentQuizArr.quizOne });
            this.props.currQuizObj(currentQuizArr.quizOne);
            quizTaken.push(currentQuizArr.quizOne);
            quizTaken = JSON.stringify(quizTaken);
            // localStorage.setItem("quizTaken", quizTaken);
            // this.props.quizTakenArr(quizTaken);
            firebase.setQuizTaken(this.props.selectedQuiz.id);

            break;
          } else {
            // alert("invalid key entered");
            Swal.fire("Error", "Invalid password entered", "error");
          }
        } else if (currentQuizTitle === null) {
          Swal.fire(
            "Session expired",
            "please select your test again.",
            "warning"
          );
          //   alert("secession expired, ");
          this.setState({ startQuiz: false });
          localStorage.setItem("startQuiz", false);
          break;
        }
      }
    }
  }

  renderFloatingBtn() {
    return (
      <div className="floatingBtn" onClick={() => this.back()}>
        <i className="fa fa-chevron-left" style={{ color: "white" }}></i>
      </div>
    );
  }

  renderQuizDetails() {
    console.log(this.props);
    let currentQuizObj = this.props.selectedQuiz;

    const currentQuizArr = [];

    currentQuizArr.push(currentQuizObj);
    const styles = { backgroundColor: "#13A89E", color: "white" };
    // const quizTaken = JSON.parse(localStorage.getItem("quizTaken")) || [];
    const quizTaken = this.props.quizTaken;
    for (let arr of currentQuizArr) {
      if (typeof arr === "object") {
        quizTaken.map(items => {
          if (arr.mainTitle === items.title) {
            arr.done = true;
            arr.quizOne.finalScore = items.finalScore;
          }
        });
      }
    }

    return (
      <div className="quizDetailDiv">
        {currentQuizArr.map(items => {
          console.log(items);
          // console.log(
          //   Object.keys(items).filter(item => {
          //     console.log(item.toString().substring() === `quiz`);
          //     return item.toString().substr() === "quiz";
          //   })
          // );
          return Object.values(items).map(item =>
            typeof item === "object" ? (
              <div
                className="card text-center"
                key={item.topic}
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>
                    <b>Description:</b>
                    <span>{` ${item.description}`}</span>
                  </p>
                  <p>
                    <b>Passing Score:</b>
                    <span>{` ${item.passingScore}`}</span>
                  </p>
                  {!item.done ? (
                    <span>
                      <p>
                        <b>Quiz duration:</b>
                        <span>{` ${item.quizTime} min`}</span>
                      </p>
                      <button
                        type="submit"
                        className="btn btnApp"
                        style={styles}
                        onClick={() => {
                          this.startQuiz(item.title);
                        }}
                      >
                        Start Quiz
                      </button>
                    </span>
                  ) : (
                    <span>
                      {item.finalScore >= item.passingScore ? (
                        <h4>
                          <b>Your Score:</b>
                          <span style={{ color: "green" }}>
                            {item.finalScore}
                          </span>
                          /100
                        </h4>
                      ) : (
                        <h4>
                          <b>Your Score:</b>
                          <span style={{ color: "red" }}>
                            {item.finalScore}
                          </span>
                          /100
                        </h4>
                      )}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              undefined
            )
          );
        })}
      </div>
    );
  }

  renderAskKey() {
    return (
      <div className="keyDiv">
        <div className="form-group">
          <input
            type="password"
            className="form-control "
            placeholder="Enter Key"
            onChange={e => {
              this.setState({ enteredKey: e.target.value });
            }}
          />
          <br />
          <div className="loginBtn">
            <button
              type="submit"
              className="btn"
              style={{ width: "120px" }}
              onClick={() => {
                this.checkKey();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { startQuiz, currentQuizObj } = this.state;
    const currQuizObj = this.props.currentQuizObj;
    console.log(currQuizObj);
    return (
      <div>
        {!currentQuizObj && this.renderFloatingBtn()}
        {!startQuiz && this.renderQuizDetails()}
        {startQuiz && !currentQuizObj && this.renderAskKey()}
        {startQuiz && currentQuizObj && (
          // <Quizpage Quiz={this.props.currentQuizObj} goBack={this.back} />
          <Quizpage goBack={this.back} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    selectedQuiz: state.loadQuiz.quizes[state.loadQuiz.id],
    currentQuizObj: state.quizDetail.currentQuizObj,
    currentQuizTitle: state.quizDetail.currentQuizTitle,
    quizTaken: state.quizDetail.quizTaken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currQuizObj: data => {
      dispatch(currQuizObj(data));
    },
    currQuizTitle: data => {
      dispatch(currQuizTitle(data));
    },
    startQuiz: data => {
      dispatch(startQuiz(data));
    }
    // quizTakenArr: data => {
    //   dispatch(quizTakenArr(data));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizDetails);

import React, { Component } from "react";
import "../App.css";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { quizTakenAction, finalScore } from "../store/actions";

class Quizpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Quiz: props.Quiz,
      index: 0,
      finalScore: null,
      timer: null,
      check: false
    };
    this.quizTime = parseInt(this.props.quizObj.quizTime.substr(0, 1), 10);
    this.passingScore = parseInt(this.props.passingScore, 10);
    this.result = 0;
    console.log(this.props);
  }
  componentWillMount() {
    console.log(this.props);
    let index = JSON.parse(localStorage.getItem("index"));
    let result = JSON.parse(localStorage.getItem("result"));
    let finalScore = JSON.parse(localStorage.getItem("finalcore"));
    if (index === null || result === null) {
      index = 0;
      result = 0;
    }
    this.setState({ index, finalScore });
    this.result = result;
    this.timer();
  }

  back() {
    localStorage.setItem("finalScore", null);
    this.setState({ finalScore: null });
    this.props.goBack();
  }

  next() {
    let { index } = this.state;
    let Quiz = this.props.quizObj;
    let quizTaken = this.props.quizTaken;

    console.log(Quiz);
    let { questions } = Quiz;
    let answer = document.querySelector("input[name='option']:checked");
    // let quizTaken = JSON.parse(localStorage.getItem("quizTaken")) || [];

    if (answer === null) {
      Swal.fire("Warning", "Please select an answer", "warning");
    } else {
      if (questions[index].correct === answer.value) {
        this.result++;
        localStorage.setItem("result", this.result);
      }
      if (index === questions.length - 1) {
        answer.checked = false;
        console.log("result", this.result);
        let correct = this.result;
        let total = questions.length;
        let finalScore = (correct / total) * 100;
        finalScore = parseInt(finalScore);
        console.log(finalScore);
        this.result = 0;
        // index = 0;
        // console.log(index);
        this.setState({ finalScore, index });
        this.setState({ check: true });
        localStorage.setItem("index", 0);
        localStorage.setItem("result", 0);
        localStorage.setItem("finalScore", finalScore);
        this.props.finalScore(finalScore);
        for (let quiz of this.props.quizTaken) {
          if (quiz.title === Quiz.title) {
            quiz.finalScore = finalScore;
          }
        }
        // quizTaken = JSON.stringify(quizTaken);
        // localStorage.setItem("quizTaken", quizTaken);
        this.props.quizTakenAction(quizTaken);
        return;
      }
      index++;
      this.setState({ index });
      localStorage.setItem("index", index);
      answer.checked = false;
    }
  }

  timer() {
    let mins = this.quizTime - 1;
    let seconds = 59;
    let { index } = this.state;
    let Quiz = this.props.quizObj;
    const { questions } = Quiz;
    let quizTimer = setInterval(() => {
      seconds--;
      if (seconds === 0) {
        mins--;
        seconds = 60;
      }
      if (mins < 0) {
        mins = 0;
        seconds = 0;
        clearInterval(quizTimer);
        Swal.fire("Time out", "", "error");
        // alert("time out");
        let correct = this.result;
        let total = questions.length;
        let finalScore = (correct / total) * 100;
        finalScore = parseInt(finalScore);
        index = 0;
        this.result = 0;
        if (finalScore === 0) {
          finalScore = 0.1;
        }
        localStorage.setItem("index", 0);
        localStorage.setItem("result", 0);
        localStorage.setItem("finalScore", finalScore);

        this.props.finalScore(finalScore);
        this.setState({ finalScore, index });
      }
      this.setState({ timer: digits(mins, seconds) });

      if (this.state.finalScore !== null) {
        clearInterval(quizTimer);
      }
    }, 1000);

    function digits(num1, num2) {
      if (num1 > 9 && num2 > 9) {
        return num1 + ":" + num2;
      } else if (num1 < 10 && num2 > 9) {
        return "0" + num1 + ":" + num2;
      } else if (num1 > 9 && num2 < 10) {
        return num1 + ":" + "0" + num2;
      } else if (num1 < 10 && num2 < 10) {
        return "0" + num1 + ":" + "0" + num2;
      }
    }
  }

  renderQuestions() {
    const { index, timer } = this.state;
    const Quiz = this.props.quizObj;
    const { questions } = Quiz;
    let quizArray = questions[index];
    return (
      <div className="quizContainer" style={{ padding: "20px" }}>
        <h4>{timer}</h4>
        <h3>
          <b>
            Q#{index + 1}/{questions.length} :
          </b>
          {quizArray.question}
        </h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="custom-control custom-radio radioDiv"
            style={{
              display: "inline-grid",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              width: "200px"
            }}
          >
            <input
              type="radio"
              id="customRadio1"
              name="option"
              value={quizArray.option1}
              className="custom-control-input"
              style={{ opacity: 1, marginTop: "5px" }}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadio1"
              style={{ fontSize: "14px", marginLeft: "20px" }}
            >
              {quizArray.option1}
            </label>
          </div>
          <div
            className="custom-control custom-radio"
            style={{
              display: "inline-grid",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              width: "200px"
            }}
          >
            <input
              type="radio"
              id="customRadio2"
              name="option"
              value={quizArray.option2}
              className="custom-control-input"
              style={{ opacity: 1, marginTop: "5px" }}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadio2"
              style={{ fontSize: "14px", marginLeft: "20px" }}
            >
              {quizArray.option2}
            </label>
          </div>
          <div
            className="custom-control custom-radio"
            style={{
              display: "inline-grid",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              width: "200px"
            }}
          >
            <input
              type="radio"
              id="customRadio3"
              name="option"
              value={quizArray.option3}
              className="custom-control-input"
              style={{ opacity: 1, marginTop: "5px" }}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadio3"
              style={{ fontSize: "14px", marginLeft: "20px" }}
            >
              {quizArray.option3}
            </label>
          </div>
          <div
            className="custom-control custom-radio"
            style={{
              display: "inline-grid",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              width: "200px"
            }}
          >
            <input
              type="radio"
              id="customRadio4"
              name="option"
              value={quizArray.option4}
              className="custom-control-input"
              style={{ opacity: 1, marginTop: "5px" }}
            />
            <label
              className="custom-control-label"
              htmlFor="customRadio4"
              style={{ fontSize: "14px", marginLeft: "20px" }}
            >
              {quizArray.option4}
            </label>
          </div>
          <div className="nextBtn">
            <button
              type="submit"
              className="btn"
              style={{ width: "120px" }}
              onClick={() => this.next()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderResult() {
    const { finalScore } = this.state;
    console.log("final score", finalScore);
    const Quiz = this.props;
    console.log("props final score=>", this.props.passingScore);
    return (
      <div className="keyDiv">
        {finalScore >= parseInt(this.props.passingScore) ? (
          <h1 style={{ color: "green" }}>Congratulations you're passed</h1>
        ) : (
          <h1 style={{ color: "red" }}>Sorry you're failed</h1>
        )}
        <h4>Quiz Name: {Quiz.title} </h4>
        <h4>Score: {finalScore} / 100</h4>
        <h4>Passing Score: {this.props.passingScore}</h4>
        <div className="nextBtn">
          <button
            type="submit"
            className="btn"
            style={{ width: "120px" }}
            onClick={() => this.back()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { check } = this.state;
    return (
      <div>
        {!check && this.renderQuestions()}
        {check && this.renderResult()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);

  return {
    quizObj: state.quizDetail.currentQuizObj,
    quizTaken: state.quizDetail.quizTaken,
    quizDetail: state.quizDetail,
    passingScore: state.quizDetail.currentQuizObj.passingScore,
    score: state.quizDetail.currentQuizObj.finalScore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    quizTakenAction: data => {
      dispatch(quizTakenAction(data));
    },
    finalScore: data => {
      dispatch(finalScore(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizpage);

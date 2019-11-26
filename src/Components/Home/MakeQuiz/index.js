import React, { Component } from "react";
import firebase from "../../../Config/firebase";
import Navbar from "../../Navbar";
import Swal from "sweetalert2";

import { Link as RouterLink } from "react-router-dom";

class MakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: null,
      numQues: null,
      currIndex: 1,
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: "",
      question: "",
      quesArr: [],
      time: "",
      topic: "",
      quizKey: "",
      descript: "",
      passingScore: "",
      profilePic: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    console.log("name=>", name);
    console.log("value=>", value);
    if (name === "profilePic") {
      const { files } = e.target;

      console.log("files=>", files);

      return this.setState({ profilePic: files[0] });
    }
    this.setState({ [name]: value });
  };

  submit = e => {
    console.log(e);
    e.preventDefault();
    this.nextQues();
    // console.log(this.state);

    let {
      time,
      topic,
      quesArr,
      quizKey,
      descript,
      passingScore,
      profilePic
    } = this.state;

    const quizObj = {
      id: Math.random(),
      mainTitle: topic,
      profilePic: profilePic,
      quizOne: {
        questions: quesArr,
        topic: topic,
        quizTime: time,
        quizKey: quizKey,
        done: false,
        description: descript,
        passingScore: passingScore
      }
    };
    console.log(quizObj);

    firebase.uploadQuiz(quizObj);
    Swal.fire("Quiz Added Successfully", "You post a Quiz", "success");

    setTimeout(() => {
      this.setState({ back: true });
    }, 2000);
  };

  nextQues = () => {
    let { currIndex } = this.state;
    // numQues = parseInt(numQues);
    // JSON.stringify(numQues);
    currIndex++;
    this.setState({ currIndex });

    let {
      question,
      option1,
      option2,
      option3,
      option4,
      correct,
      quesArr
    } = this.state;

    if (
      question !== "" &&
      option1 !== "" &&
      option2 !== "" &&
      option3 !== "" &&
      option4 !== "" &&
      correct !== ""
    ) {
      let quesObj = {
        question,
        option1,
        option2,
        option3,
        option4,
        correct
      };

      question = "";
      option1 = "";
      option2 = "";
      option3 = "";
      option4 = "";
      correct = "";

      let arr = quesArr;
      arr.push(quesObj);
      this.setState({
        quesArr: arr,
        next: true,
        question,
        option1,
        option2,
        option3,
        option4,
        correct
      });
    } else {
      Swal.fire("Error..", "Please Enter All Fields", "error");
    }
  };

  next = e => {
    console.log("event=>", e);
    e.preventDefault();
    let {
      topic,
      descript,
      numQues,
      quizKey,
      time,
      profilePic,
      passingScore
    } = this.state;

    if (
      topic !== "" &&
      descript !== "" &&
      numQues !== "" &&
      quizKey !== "" &&
      time !== "" &&
      profilePic !== "" &&
      passingScore !== ""
    ) {
      this.setState({ next: true });
    } else {
      Swal.fire("Warning", "Please fill all fields", "error");
    }

    console.log(this.state);
  };

  renderBack() {
    return (
      <RouterLink to="/admin" style={{ color: "white" }}>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          style={{ margin: "10px 0px" }}
        >
          Back
        </button>
      </RouterLink>
    );
  }

  renderAskQues() {
    while (this.state.currIndex <= this.state.numQues) {
      return (
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0 auto"
          }}
        >
          <div>
            <label>
              <h5>Enter Question {this.state.currIndex}</h5>
            </label>

            <input
              type="text"
              value={this.state.question}
              name="question"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <h5>Enter Option 1</h5>
            </label>
            <input
              type="text"
              value={this.state.option1}
              name="option1"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <h5>Enter Option 2</h5>
            </label>
            <input
              type="text"
              value={this.state.option2}
              name="option2"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <h5>Enter Option 3</h5>
            </label>
            <input
              type="text"
              value={this.state.option3}
              name="option3"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>
              <h5>Enter Option 4</h5>
            </label>
            <input
              type="text"
              value={this.state.option4}
              name="option4"
              onChange={this.handleChange}
            />
            <label>
              <h5>Enter Correct Option</h5>
            </label>
            <input
              type="text"
              value={this.state.correct}
              name="correct"
              onChange={this.handleChange}
            />
          </div>
          {this.state.currIndex < this.state.numQues ? (
            <div style={{ margin: "50px" }}>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                onClick={this.nextQues}
              >
                Next
              </button>
              <br />
            </div>
          ) : (
            <div style={{ margin: "50px" }}>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                onClick={this.submit}
              >
                Finish
              </button>
              <br />
            </div>
          )}
        </div>
      );
    }
  }

  renderInfo() {
    return (
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto"
        }}
      >
        <form>
          <label>
            <h5>Enter Name of Topic</h5>
          </label>
          <input type="text" name="topic" onChange={this.handleChange} />
          <label>
            <h5>Enter Description of Quiz</h5>
          </label>
          <input type="text" name="descript" onChange={this.handleChange} />
          <label>
            <h5>Enter Number of Questions</h5>
          </label>
          <input type="number" name="numQues" onChange={this.handleChange} />
          <label>
            <h5>Enter Time of Quiz (in min)</h5>
          </label>
          <input type="number" name="time" onChange={this.handleChange} />
          <label>
            <h5>Enter quiz key (number)</h5>
          </label>
          <input type="number" name="quizKey" onChange={this.handleChange} />
          <label>
            <h5>Add Logo Pic</h5>
          </label>
          <input
            label="Profile Pic"
            type="file"
            onChange={this.handleChange}
            name="profilePic"
            style={{ margin: "20px" }}
          />
          <br />
          <label>
            <h5>Enter Passing Score</h5>
          </label>
          <input
            type="number"
            name="passingScore"
            onChange={this.handleChange}
          />
          <div style={{ margin: "50px" }}>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              onClick={e => this.next(e)}
            >
              Next
            </button>
            <br />
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderBack()}
        <h3>Make Your Own Quiz</h3>
        {console.log(this.state.next)}
        {!this.state.next ? this.renderInfo() : this.renderAskQues()}
      </div>
    );
  }
}

export default MakeQuiz;

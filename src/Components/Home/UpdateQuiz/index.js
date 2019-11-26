import React, { Component } from "react";
import Navbar from "../../Navbar";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";

import UpdatingQuiz from "./UpdatingQuiz";

import {
  getQuizes,
  updateQuiz,
  deleteQuiz
  //   updateQuizes
} from "../../../store/actions";
import Swal from "sweetalert2";

import firebase from "../../../Config/firebase";

class Update extends Component {
  state = {
    showEditing: false,
    index: null,
    ids: null,
    time: "",
    topic: "",
    quizKey: "",
    descript: "",
    passingScore: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct: "",
    quesArr: [],
    editQuiz: false
  };

  setInitialQuiz = (quiz, index) => {
    this.setState({
      question: quiz.questions[index].question,
      option1: quiz.questions[index].option1,
      option2: quiz.questions[index].option2,
      option3: quiz.questions[index].option3,
      option4: quiz.questions[index].option4,
      correct: quiz.questions[index].correct
    });
  };

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

  deleteQuizfunc = async (index, id) => {
    console.log(this.props.id[index]);
    let firebaseId = id[index];
    await firebase.deleteQuiz(firebaseId);
    let indx = await this.props.updateQuiz(index);
    await this.props.deleteQuiz(indx);
    Swal.fire("Delete Successfull", "Quiz deleted Successfully", "success");
  };

  updateQuizfunc = async (index, id) => {
    console.log(index);
    console.log(id);
    console.log(id[index]);
    console.log(this.props.quizes[0]);
    this.setState({ index: index });
    this.setState({ showEditing: true });
    this.setState({ id: id[index] });
  };

  submitQues = index => {
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
      let obj = {
        question,
        option1,
        option2,
        option3,
        option4,
        correct
      };
      console.log(obj);
      quesArr[index] = obj;
      console.log(quesArr);

      this.setState({
        quesArr: quesArr,
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct: ""
      });

      Swal.fire(" Succesfull", "Successfully updated Quiz", "success");
    } else {
      Swal.fire("Warning..!", "Please Enter All Fields", "warning");
    }
  };

  submit = () => {
    let {
      time,
      topic,
      quizKey,
      descript,
      passingScore,
      id,
      quesArr
    } = this.state;

    if (
      time !== "" &&
      topic !== "" &&
      quizKey !== "" &&
      descript !== "" &&
      passingScore !== "" &&
      id !== "" &&
      quesArr !== ""
    ) {
      const quizObj = {
        id: id,
        mainTitle: topic,
        quizOne: {
          topic: topic,
          quizTime: time,
          quizKey: quizKey,
          done: false,
          description: descript,
          passingScore: passingScore,
          questions: quesArr
        }
      };
      firebase.updateQuiz(quizObj);
    } else {
      Swal.fire("Warning..!", "Please Enter All Fields", "warning");
    }
  };

  edit = ques => {
    console.log(ques);
    this.setState({ quesArr: ques });
  };

  render() {
    return (
      <div>
        <Navbar />
        <RouterLink to="/admin" style={{ color: "white" }}>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Back
          </button>
        </RouterLink>

        <h1>Update Questions Page</h1>

        {/* <button
          className="btn waves-effect waves-light"
          type="submit"
          onClick={this.props.getQuiz}
        >
          Get Redux Quizes
        </button> */}
        <br />

        {console.log(this.props.quizes)}

        {this.state.showEditing === false ? (
          this.props.quizes.map((items, indx) => (
            <div className="flip-card" key={indx}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={items.profilePic} alt="logo" id="cardLogo" />
                </div>
                <div className="flip-card-back">
                  <h3>{items.mainTitle}</h3>
                  <p>
                    This Covers all quizes related to {[items.topic].descript}
                  </p>
                  <button
                    className="btn waves-effect waves-light purple"
                    style={{ margin: "0px 5px" }}
                    type="submit"
                    id="takeQuizBtn"
                    onClick={() => {
                      console.log("Update=>", indx);
                      this.updateQuizfunc(indx, this.props.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn waves-effect waves-light red"
                    style={{ margin: "0px 5px" }}
                    type="submit"
                    id="takeQuizBtn"
                    onClick={() => {
                      console.log("Delete=>", indx);
                      this.deleteQuizfunc(indx, this.props.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ width: "80%", margin: "0 auto" }}>
            {/* <h5>Main title</h5>
            <input
                name="topic"
              onChange={this.handleChange}
              value={this.props.quizes[this.state.index].mainTitle}
            /> */}
            <h5>Description</h5>
            <input
              name="descript"
              onChange={this.handleChange}
              placeholder={
                this.props.quizes[this.state.index].quizOne.description
              }
            />

            <h5>Passing Score</h5>
            <input
              name="passingScore"
              onChange={this.handleChange}
              placeholder={
                this.props.quizes[this.state.index].quizOne.passingScore
              }
            />
            <h5>QuizKey</h5>
            <input
              name="quizKey"
              onChange={this.handleChange}
              placeholder={this.props.quizes[this.state.index].quizOne.quizKey}
            />
            <h5>Quiz Time (in min)</h5>
            <input
              name="time"
              onChange={this.handleChange}
              placeholder={this.props.quizes[this.state.index].quizOne.quizTime}
            />
            <h5>Topic</h5>
            <input
              name="topic"
              onChange={this.handleChange}
              placeholder={this.props.quizes[this.state.index].quizOne.topic}
            />
            <button
              className="btn waves-effect waves-light red"
              type="submit"
              onClick={() =>
                this.edit(this.props.quizes[this.state.index].quizOne.questions)
              }
            >
              Edit Questions
            </button>
            <div>
              {/* {this.props.quizes[this.state.index].quizOne.questions.map(
                (ques, index) => {
                  return (
                    <div key={index}>
                      <button onClick={() => this.edit(ques)}>
                        Edit Question
                      </button> */}

              {/* <h5>Question num {index + 1}</h5>
                      <input
                        name="question"
                        onChange={this.handleChange}
                        placeholder={ques.question}
                      />
                      <h5>Option 1</h5>
                      <input
                        name="option1"
                        onChange={this.handleChange}
                        placeholder={ques.option1}
                      />
                      <h5>Option 1</h5>
                      <input
                        name="option2"
                        onChange={this.handleChange}
                        placeholder={ques.option2}
                      />
                      <h5>Option 1</h5>
                      <input
                        name="option3"
                        onChange={this.handleChange}
                        placeholder={ques.option3}
                      />
                      <h5>Option 1</h5>
                      <input
                        name="option4"
                        onChange={this.handleChange}
                        placeholder={ques.option4}
                      />
                      <h5>Correct</h5>
                      <input
                        name="correct"
                        onChange={this.handleChange}
                        placeholder={ques.correct}
                      /> */}
              {/* </div>
                  );
                }
              )} */}
              {this.state.quesArr ? (
                <UpdatingQuiz
                  questions={this.state.quesArr}
                  handleChange={this.handleChange}
                  submitQues={this.submitQues}
                  setInitialQuiz={this.setInitialQuiz}
                  state={this.state}
                />
              ) : null}
            </div>
            <button
              className="btn waves-effect waves-light blue"
              type="submit"
              onClick={() => this.submit()}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    quizes: state.loadQuiz.quizes,
    id: state.loadQuiz.quizes.map(quiz => {
      return quiz.id;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuiz: data => {
      dispatch(getQuizes(data));
    },
    updateQuiz: data => {
      dispatch(updateQuiz(data));
    },
    deleteQuiz: data => {
      dispatch(deleteQuiz(data));
    }
    // updateQuizes: id => {
    //   dispatch(updateQuizes(id));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);

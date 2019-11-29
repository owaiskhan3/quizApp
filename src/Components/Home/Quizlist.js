import React, { Component } from "react";
import "./Quizlist.css";
import { connect } from "react-redux";
import firebase from "firebase";
import Swal from "sweetalert2";
import loader from "../../logo/loader.gif";

import {
  loadQuiz,
  takeQuiz,
  showNull,
  getAssignQuizes
} from "../../store/actions";
import QuizDetails from "../QuizDetails";

class Quizlist extends Component {
  // console.log(this.props);
  // console.log(this.props.quizList);

  state = {
    givenQuiz: [],
    givenQuizResult: {},
    loading: true
  };

  back = () => {
    console.log(this.props);
    this.props.showNull();
  };

  componentDidMount = async () => {
    // this.props.loadQuiz();
    this.props.getAssignQuizes();

    const uid = await firebase
      .firestore()
      .collection("currUser")
      .doc("uid")
      .get();
    console.log("userId=>", uid);

    let data = await uid.data();
    console.log("userId=>", data.userId);

    let quizData = await firebase
      .firestore()
      .collection("users")
      .doc(data.userId)
      .get();

    console.log(quizData.data().quizAssigned);

    let quizIDsArr = [];
    for (let quizIDs in quizData.data().quizAssigned) {
      console.log(quizData.data().quizAssigned[quizIDs]);
      if (quizData.data().quizAssigned[quizIDs] !== undefined) {
        if (quizData.data().quizAssigned[quizIDs].quizTaken === true) {
          // console.log(quizData.data().quizAssigned[quizIDs]);
          // console.log("Not taken Quiz");
          quizIDsArr.push(quizData.data().quizAssigned[quizIDs].quizId);
        }
      } else {
        setTimeout(() => {
          Swal.fire("Warning", "No Quiz Given Yet", "warning");
        }, 2000);
      }
    }

    console.log(quizIDsArr);
    let quizId = quizIDsArr[0];

    let givenQuizArr = [];

    quizIDsArr.map(quizIDs => {
      givenQuizArr.push(quizData.data().quizAssigned[quizIDs]);
    });

    console.log(givenQuizArr);

    console.log(quizData.data().quizAssigned[quizId]);
    // this.setState({ givenQuizResult: quizData.data().quizAssigned[quizId] });
    this.setState({ givenQuizResult: givenQuizArr });

    // await firebase.firestore().collection();

    await firebase
      .firestore()
      .collection("userQuiz")
      .onSnapshot(querySnapshot => {
        const quiz = [];

        querySnapshot.forEach(item => {
          console.log(item.data());
          // console.log(item.data());
          quizIDsArr.map(id => {
            if (id == item.id) {
              console.log("push");
              console.log(item.data());
              quiz.push({ id: item.id, ...item.data() });
            }
          });
        });
        console.log(quiz);
        this.setState({ givenQuiz: quiz });
      });
    this.setState({ loading: false });
  };

  renderGivenQuizes = () => {
    const { givenQuiz, givenQuizResult } = this.state;
    console.log(givenQuiz);
    console.log(givenQuizResult);

    return (
      <div className="quizDiv">
        <div>
          {/* <button
            className="btn waves-effect waves-light"
            type="submit"
            onClick={() => this.props.getAssignQuizes()}
          >
            Get Quizes from Redux
          </button> */}
        </div>
        {givenQuiz.map((items, indx) => {
          console.log(items);
          if (items.id === givenQuizResult[indx].quizId) {
            return (
              <div className="flip-card" key={indx}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={items.profilePic} alt="logo" id="cardLogo" />
                  </div>
                  <div className="flip-card-back">
                    <h3>{items.mainTitle}</h3>
                    <p>
                      This Covers all quizes related to{" "}
                      {items.quizOne.description}
                    </p>

                    <span>
                      {givenQuizResult[indx].finalScore >=
                      items.quizOne.passingScore ? (
                        <h4>
                          <b>Your Score:</b>
                          <span style={{ color: "green" }}>
                            {givenQuizResult[indx].finalScore}
                          </span>
                          /100
                        </h4>
                      ) : (
                        <h4>
                          <b>Your Score:</b>
                          <span style={{ color: "red" }}>
                            {givenQuizResult[indx].finalScore}
                          </span>
                          /100
                        </h4>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  renderQuizes = () => {
    const quizes = this.props.quizList.quizes;
    console.log(quizes);
    return (
      <div className="quizDiv">
        <div>
          {/* <button
            className="btn waves-effect waves-light"
            type="submit"
            onClick={() => this.props.getAssignQuizes()}
          >
            Get Quizes from Redux
          </button> */}
        </div>
        {quizes.map((items, indx) => {
          console.log(items);
          return (
            <div className="flip-card" key={indx}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={items.profilePic} alt="logo" id="cardLogo" />
                </div>
                <div className="flip-card-back">
                  <h3>{items.mainTitle}</h3>
                  <p>
                    This Covers all quizes related to{" "}
                    {items.quizOne.description}
                  </p>

                  {!items.quizOne.done ? (
                    <span>
                      <p>
                        <b>Quiz duration:</b>
                        <span>{` ${items.quizOne.quizTime} min`}</span>
                      </p>
                      <button
                        className="btn waves-effect waves-light red"
                        type="submit"
                        id="takeQuizBtn"
                        onClick={() => this.props.takeQuiz(indx)}
                      >
                        Take Quiz
                      </button>
                    </span>
                  ) : (
                    <span>
                      {items.quizOne.finalScore >=
                      items.quizOne.passingScore ? (
                        <h4>
                          <b>Your Score:</b>
                          <span style={{ color: "green" }}>
                            {items.quizOne.finalScore}
                          </span>
                          /100
                        </h4>
                      ) : (
                        <h4>
                          <b>Your Score:</b>
                          <span style={{ color: "red" }}>
                            {items.quizOne.finalScore}
                          </span>
                          /100
                        </h4>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {this.renderGivenQuizes()}
      </div>
    );
  };

  render() {
    const { id } = this.props.quizList;
    return this.state.loading ? (
      <img src={loader} />
    ) : (
      <div>
        {id === null ? this.renderQuizes() : <QuizDetails back={this.back} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    quizList: state.loadQuiz,
    givenQuizes: state.givenQuiz,
    id: state.loadQuiz.id,
    showNull: state.showNull,
    quizes: state.quizes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadQuiz: data => dispatch(loadQuiz(data)),
    takeQuiz: index => dispatch(takeQuiz(index)),
    showNull: id => dispatch(showNull(id)),
    getAssignQuizes: data => dispatch(getAssignQuizes(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizlist);

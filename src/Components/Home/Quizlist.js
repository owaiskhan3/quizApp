import React, { Component } from "react";
import "./Quizlist.css";
import { connect } from "react-redux";

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
  back = () => {
    console.log(this.props);
    this.props.showNull();
  };

  componentDidMount = () => {
    this.props.getAssignQuizes();
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
                  <button
                    className="btn waves-effect waves-light red"
                    type="submit"
                    id="takeQuizBtn"
                    onClick={() => this.props.takeQuiz(indx)}
                  >
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    const { id } = this.props.quizList;
    return (
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
    id: state.loadQuiz.id,
    showNull: state.showNull
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadQuiz: data => dispatch(loadQuiz(data)),
    takeQuiz: id => dispatch(takeQuiz(id)),
    showNull: id => dispatch(showNull(id)),
    getAssignQuizes: data => dispatch(getAssignQuizes(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizlist);

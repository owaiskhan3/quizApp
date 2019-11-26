import React, { Component } from "react";

class Updating extends Component {
  state = {
    ques: null,
    index: null
  };

  selected = (ques, index) => {
    console.log(ques);
    console.log(index);
    this.setState({ ques: ques, index: index });
  };

  render() {
    return (
      <div>
        <h1>Updating</h1>
        {/* {console.log(this.props)} */}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            {this.props.questions.map((ques, index) => {
              return (
                <button
                  className="btn waves-effect waves-light blue"
                  type="submit"
                  //   style={{ width: "100px" }}
                  key={index}
                  onClick={() => this.selected(ques, index)}
                >{`Question:${index}`}</button>
              );
            })}
          </div>
          <div>
            {this.state.ques ? (
              <div>
                <p>Question</p>
                <input
                  type="text"
                  name="question"
                  onChange={this.props.handleChange}
                  placeholder={this.state.ques.question}
                  value={this.props.state.question}
                />
                <p>Option1</p>
                <input
                  type="text"
                  name="option1"
                  onChange={this.props.handleChange}
                  placeholder={this.state.ques.option1}
                  value={this.props.state.option1}
                />
                <p>Option2</p>
                <input
                  type="text"
                  name="option2"
                  onChange={this.props.handleChange}
                  placeholder={this.state.ques.option2}
                  value={this.props.state.option2}
                />
                <p>Option3</p>
                <input
                  type="text"
                  name="option3"
                  onChange={this.props.handleChange}
                  placeholder={this.state.ques.option3}
                  value={this.props.state.option3}
                />
                <p>Option4</p>
                <input
                  type="text"
                  name="option4"
                  onChange={this.props.handleChange}
                  placeholder={this.state.ques.option4}
                  value={this.props.state.option4}
                />
                <p>Correct</p>
                <input
                  type="text"
                  name="correct"
                  onChange={this.props.handleChange}
                  placeholder={this.state.ques.correct}
                  value={this.props.state.correct}
                />
                <button
                  className="btn waves-effect waves-light green"
                  type="submit"
                  onClick={() => this.props.submitQues(this.state.index)}
                >
                  Update in Database
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Updating;

import { combineReducers } from "redux";
import loadQuizReducer from "./loadQuizReducer";
import quizDetailsReducer from "./quizDetailsReducer";
import quizPageReducer from "./quizPageReducer";

export default combineReducers({
  loadQuiz: loadQuizReducer,
  quizDetail: quizDetailsReducer,
  quizPage: quizPageReducer
});

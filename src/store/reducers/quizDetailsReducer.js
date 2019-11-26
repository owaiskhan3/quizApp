const initialState = {
  startQuiz: false,
  enteredKey: null,
  currentQuizTitle: null,
  currentQuizObj: null,
  quizTaken: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state
      };

    case "STARTQUIZ":
      return {
        ...state,
        startQuiz: action.payload
      };

    case "CURRQUIZOBJ":
      return {
        ...state,
        currentQuizObj: action.payload
      };

    case "CURRQUIZTITLE":
      return {
        ...state,
        currentQuizTitle: action.payload
      };

    // case "QUIZTAKEN": {
    //   return {
    //     ...state,
    //     quizTaken: action.payload
    //   };
    // }

    default:
      return state;
  }
};

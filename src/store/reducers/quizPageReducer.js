const initialState = {
  quizTaken: [],
  score: null,
  index: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "QUIZTAKEN":
      return {
        ...state,
        quizTaken: action.payload
      };

    case "INC_INDEX":
      return {
        ...state,
        index: action.payload
      };

    case "FINAL_SCORE":
      return {
        ...state,
        score: action.payload
      };

    default:
      return state;
  }
};

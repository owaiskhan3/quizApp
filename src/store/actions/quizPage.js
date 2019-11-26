export const quizTakenAction = data => {
  return {
    type: "QUIZTAKEN",
    payload: data
  };
};

export const incIndex = index => {
  index++;
  return {
    type: "INC_INDEX",
    payload: index
  };
};

export const finalScore = data => {
  return {
    type: "FINAL_SCORE",
    payload: data
  };
};

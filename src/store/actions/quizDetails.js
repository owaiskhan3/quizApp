export const add = data => {
  return {
    type: "ADD",
    payload: data
  };
};

export const startQuiz = data => {
  return {
    type: "START",
    payload: data
  };
};

export const currQuizObj = data => {
  return {
    type: "CURRQUIZOBJ",
    payload: data
  };
};

export const currQuizTitle = data => {
  return {
    type: "CURRQUIZTITLE",
    payload: data
  };
};

// export const quizTakenArr = data => {
//   return {
//     type: "QUIZTAKEN",
//     payload: data
//   };
// };

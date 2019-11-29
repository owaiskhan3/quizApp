import * as firebase from "firebase";
import Swal from "sweetalert2";

// export const getQuizes = () => async dispatch => {
//   console.log("fetching data...");
//   const data = await firebase
//     .firestore()
//     .collection("userQuiz")
//     .get();
//   console.log(data);
//   let result = [];
//   data.forEach(doc => {
//     // console.log(doc.data());
//     result.push(doc.data());
//     console.log(doc.data());
//   });
//   console.log("GOT DATA json =>", result);
//   dispatch({
//     type: "SAVE_QUIZES_DATA",
//     payload: result
//   });
// };

export const loadQuiz = data => {
  return {
    type: "LOAD_QUIZ",
    payload: data
  };
};

export const takeQuiz = index => {
  return {
    type: "TAKE_QUIZ",
    payload: index
  };
};

export const showNull = id => {
  id = null;
  return {
    type: "SHOW_NULL",
    payload: id
  };
};

export const updateQuiz = data => {
  console.log("update Quiz=>", data);

  return {
    type: "UPDATE_QUIZ",
    payload: data
  };
};

export const getAssignQuizes = () => async dispatch => {
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
      if (quizData.data().quizAssigned[quizIDs].quizTaken === false) {
        // console.log(quizData.data().quizAssigned[quizIDs]);
        // console.log("Not taken Quiz");
        quizIDsArr.push(quizData.data().quizAssigned[quizIDs].quizId);
      }
    } else {
      setTimeout(() => {
        Swal.fire("Warning", "No Quiz Assigned Yet", "warning");
      }, 2000);
    }
  }

  console.log(quizIDsArr);

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
      dispatch({ type: "SAVE_ASSIGNQUIZES_DATA", payload: quiz });
    });
};

export const getQuizes = () => async dispatch => {
  await firebase
    .firestore()
    .collection("userQuiz")
    .onSnapshot(querySnapshot => {
      const quiz = [];

      querySnapshot.forEach(item => {
        quiz.push({ id: item.id, ...item.data() });
      });

      dispatch({ type: "SAVE_QUIZES_DATA", payload: quiz });
    });
};

export const deleteQuiz = id => {
  return {
    type: "DELETE_QUIZ",
    payload: id
  };
};

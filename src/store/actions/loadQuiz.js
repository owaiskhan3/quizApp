// import firebase from "../../Config/firebase";
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

export const takeQuiz = id => {
  return {
    type: "TAKE_QUIZ",
    payload: id
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

// export const getAssignQuizes =(userId)=>async dispatch=>{
//   await firebase.firestore().collection("users").doc(userId).get();
// }
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

  // quizData = await quizData.assignedQuiz;
  let quizIDs = quizData.data().assignedQuiz || [];
  console.log(quizIDs);

  if (quizIDs[0] !== undefined) {
    let quizIDsArr = [];
    quizIDs.map(data => quizIDsArr.push(data.quizId));
    console.log(quizIDsArr);

    await firebase
      .firestore()
      .collection("userQuiz")
      .onSnapshot(querySnapshot => {
        const quiz = [];

        querySnapshot.forEach(item => {
          // console.log(item.id);
          // console.log(item.data());
          quizIDsArr.map(id => {
            if (id == item.id) {
              console.log("push");
              quiz.push({ id: item.id, ...item.data() });
            }
          });
        });
        console.log(quiz);
        dispatch({ type: "SAVE_ASSIGNQUIZES_DATA", payload: quiz });
      });
  } else {
    Swal.fire("Warning", "No Quiz Assigned Yet", "warning");
  }
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

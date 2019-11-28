import * as firebase from "firebase";

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

// export const finalScore = data => {
//   return {
//     type: "FINAL_SCORE",
//     payload: data
//   };
// };

export const finalScore = finalScore => async dispatch => {
  console.log(finalScore);
  const uid = await firebase
    .firestore()
    .collection("currUser")
    .doc("uid")
    .get();
  console.log("userId=>", uid);

  let userId = await uid.data().userId;
  console.log("userId=>", userId);

  let quizId = await firebase
    .firestore()
    .collection("quizId")
    .doc("quizId")
    .get();

  console.log(quizId.data().quizId);

  await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .set(
      {
        quizAssigned: {
          [quizId.data().quizId]: {
            finalScore
          }
        }
      },
      { merge: true }
    );

  dispatch({
    type: "FINAL_SCORE",
    payload: finalScore
  });
};

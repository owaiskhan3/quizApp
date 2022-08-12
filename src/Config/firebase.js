import * as firebase from 'firebase';
import Swal from 'sweetalert2';
console.log({ p: process.env });
var firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const admin = require("firebase-admin");

async function signUpWithFirebase(email, password, userName) {
  try {
    var response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log('signup');

    return await firebase.firestore().collection('users').doc(response.user.uid).set({
      uid: response.user.uid,
      email: email,
      userName: userName,
      userType: 'user',
    });
  } catch (error) {
    throw error;
  }
}

async function signInWithFirebase(email, password) {
  try {
    var response = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('signin');
    return response;
  } catch (error) {
    throw error;
  }
}

async function checkUser(uid) {
  try {
    var user = await firebase.firestore().collection('users').doc(uid).get();
    console.log(user);

    let data = await user.data();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

async function setUser(uid) {
  try {
    await firebase.firestore().collection('currUser').doc('uid').set({ userId: uid });
  } catch (e) {
    Swal.fire('Error..', e.message, 'error');
  }
}

async function getQuizes() {
  try {
    var response = await firebase
      .firestore()
      .collection('userQuiz')
      .onSnapshot((e) => {
        console.log('firebase=>', e);
        return e;
      });
    console.log(response);
    let result = [];
    response.forEach((doc) => {
      console.log(doc.data());
      result.push(doc.data());
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function getGivenQuiz(quizId) {
  quizId = quizId.toString();
  try {
    var response = await firebase.firestore().collection('userQuiz').doc(quizId).get();
    console.log(response.data());

    return response.data();
  } catch (e) {
    console.log(e);
  }
}

async function logOut() {
  try {
    var response = await firebase.auth().signOut();

    setTimeout(() => {
      window.location.assign('/');
    }, 1000);

    console.log('loggout');
    return response;
  } catch (e) {
    throw e;
  }
}

async function updateQuiz(obj) {
  console.log(obj);
  await saveUpdatedQuiz('userQuiz', obj.id, obj);
}
const saveUpdatedQuiz = async (collection, document, data) => {
  console.log(collection);
  console.log(document);
  console.log(data);
  var document = document.toString();

  await firebase.firestore().collection('userQuiz').doc(document).set(data, { merge: true });

  Swal.fire('Success', 'Quiz Updated Successfully', 'success');
};

async function uploadQuiz(quizObj) {
  const { profilePic, ...data } = quizObj;
  console.log(profilePic);
  console.log(data);
  const url = await uploadImage(profilePic, 'profilePic');
  quizObj.profilePic = url;

  console.log(quizObj);
  var document = data.id.toString();

  await saveDocument('userQuiz', document, quizObj);
}

const saveDocument = (collection, document, data) => {
  firebase.firestore().collection(collection).doc(document).set(data);
};

const uploadImage = async (file, folderName) => {
  try {
    const fileName = folderName + Math.random().toString() + '.jpg';
    const storageRef = firebase.storage().ref().child(fileName);

    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();

    return url;
  } catch (e) {
    throw e;
  }
};

const deleteQuiz = async (id) => {
  console.log(id);
  await firebase
    .firestore()
    .collection('userQuiz')
    .where('id', '==', id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
};

const getUsers = async () => {
  let usersData = [];
  await firebase
    .firestore()
    .collection('users')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        usersData.push(doc.data());
        return doc.data();
      });
    });
  return usersData;
};

//when assigned quiz was an array

// const assignQuizToUser = async (quizId, user) => {
//   // console.log(quizId + "assign to ");
//   // console.log(user);

//   let userAssign = await firebase
//     .firestore()
//     .collection("users")
//     .doc(user.uid)
//     .get();

//   // console.log(userAssign.data().assignedQuiz);

//   let quizArr = userAssign.data().assignedQuiz;

//   let val = quizArr.filter(quiz => quiz.quizId === quizId);

//   console.log(val.length);

//   if (val.length === 1) {
//     Swal.fire("Oops..", "Quiz Already Assigned..", "error");
//   } else {
//     await firebase
//       .firestore()
//       .collection("users")
//       .doc(user.uid)
//       .set(
//         {
//           assignedQuiz: firebase.firestore.FieldValue.arrayUnion({
//             quizId,
//             quizTaken: false
//           })
//         },
//         { merge: true }
//       );

//     Swal.fire(
//       "Quiz Assign Successfully",
//       `${quizId} assign to ${user.userName}`,
//       "success"
//     );
//   }
// };

const assignQuizToUser = async (quizId, user) => {
  console.log(quizId);
  console.log(user);

  let userAssign = await firebase.firestore().collection('users').doc(user.uid).get();

  console.log(userAssign.data());

  let quizAssigned = userAssign.data().quizAssigned;

  console.log(quizAssigned);

  // quizAssigned = {
  //   [quizId]: quizId,
  //   quizTaken: false
  // };
  // console.log(quizAssigned);

  let isAlready = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((quizAssigned) => {
      return quizAssigned.data().quizAssigned;
    });

  console.log(isAlready);

  let keys = Object.keys(isAlready || {});
  console.log(keys);

  let key = keys.find((key) => key == quizId);

  console.log(key);

  if (key == undefined) {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(
        {
          quizAssigned: {
            [quizId]: {
              quizId,
              quizTaken: false,
              finalScore: null,
            },
          },
        },
        { merge: true }
      );
    Swal.fire('Quiz Assign Successfully', `${quizId} assign to ${user.userName}`, 'success');
  } else {
    Swal.fire('Oops..', 'Quiz Already Assigned..', 'error');
  }
};

const setQuizTaken = async (id) => {
  console.log(id);

  let userId = await firebase.firestore().collection('currUser').doc('uid').get();
  userId = await userId.data().userId;
  console.log(userId);

  await firebase.firestore().collection('quizId').doc('quizId').set({ quizId: id });

  let quizId = await firebase.firestore().collection('users').doc(userId).get();

  console.log(quizId.data().quizAssigned[id]);
  let obj = quizId.data().quizAssigned;

  obj[id].quizTaken = true;

  console.log(obj);

  await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .set(
      {
        quizAssigned: {
          [id]: {
            quizTaken: true,
          },
        },
      },
      { merge: true }
    );
};

export default {
  signInWithFirebase,
  setUser,
  signUpWithFirebase,
  logOut,
  uploadQuiz,
  getQuizes,
  deleteQuiz,
  updateQuiz,
  getUsers,
  assignQuizToUser,
  checkUser,
  setQuizTaken,
  getGivenQuiz,
};

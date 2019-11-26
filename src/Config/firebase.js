import * as firebase from "firebase";
import Swal from "sweetalert2";

var firebaseConfig = {
  apiKey: "AIzaSyCPh0sbgDAoZKSgpbi60sSH-SIRosSpXnI",
  authDomain: "react-myquiz-app.firebaseapp.com",
  databaseURL: "https://react-myquiz-app.firebaseio.com",
  projectId: "react-myquiz-app",
  storageBucket: "react-myquiz-app.appspot.com",
  messagingSenderId: "780059601855",
  appId: "1:780059601855:web:971c7045787bc52bcdcf0a",
  measurementId: "G-PX4RHVQVY9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const admin = require("firebase-admin");

async function signUpWithFirebase(email, password, userName) {
  try {
    var response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log("signup");

    return await firebase
      .firestore()
      .collection("users")
      .doc(response.user.uid)
      .set({
        uid: response.user.uid,
        email: email,
        userName: userName,
        userType: "user"
      });
  } catch (error) {
    throw error;
  }
}

async function signInWithFirebase(email, password) {
  try {
    var response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("signin");
    return response;
  } catch (error) {
    throw error;
  }
}

async function checkUser(uid) {
  try {
    var user = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
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
    await firebase
      .firestore()
      .collection("currUser")
      .doc("uid")
      .set({ userId: uid });
  } catch (e) {
    Swal.fire("Error..", e.message, "error");
  }
}

async function getQuizes() {
  try {
    var response = await firebase
      .firestore()
      .collection("userQuiz")
      .onSnapshot(e => {
        console.log("firebase=>", e);
        return e;
      });
    console.log(response);
    let result = [];
    response.forEach(doc => {
      console.log(doc.data());
      result.push(doc.data());
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function logOut() {
  try {
    var response = await firebase.auth().signOut();

    setTimeout(() => {
      window.location.assign("/");
    }, 1000);

    console.log("loggout");
    return response;
  } catch (e) {
    throw e;
  }
}

async function updateQuiz(obj) {
  console.log(obj);
  await saveUpdatedQuiz("userQuiz", obj.id, obj);
}
const saveUpdatedQuiz = async (collection, document, data) => {
  console.log(collection);
  console.log(document);
  console.log(data);
  var document = document.toString();

  await firebase
    .firestore()
    .collection("userQuiz")
    .doc(document)
    .set(data, { merge: true });

  Swal.fire("Success", "Quiz Updated Successfully", "success");
};

async function uploadQuiz(quizObj) {
  const { profilePic, ...data } = quizObj;
  console.log(profilePic);
  console.log(data);
  const url = await uploadImage(profilePic, "profilePic");
  quizObj.profilePic = url;

  console.log(quizObj);
  var document = data.id.toString();

  await saveDocument("userQuiz", document, quizObj);
}

const saveDocument = (collection, document, data) => {
  firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .set(data);
};

const uploadImage = async (file, folderName) => {
  try {
    const fileName = folderName + Math.random().toString() + ".jpg";
    const storageRef = firebase
      .storage()
      .ref()
      .child(fileName);

    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();

    return url;
  } catch (e) {
    throw e;
  }
};

const deleteQuiz = async id => {
  console.log(id);
  await firebase
    .firestore()
    .collection("userQuiz")
    .where("id", "==", id)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
};

const getUsers = async () => {
  let usersData = [];
  await firebase
    .firestore()
    .collection("users")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        usersData.push(doc.data());
        return doc.data();
      });
    });
  return usersData;
};
// console.log(users);
// const userData = await users.doc.data();
// console.log("users=>", userData);
// };

const assignQuizToUser = async (quizId, user) => {
  console.log(quizId + "assign to ");
  console.log(user);

  await firebase
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(
      {
        assignedQuiz: firebase.firestore.FieldValue.arrayUnion({ quizId })
      },
      { merge: true }
    );

  Swal.fire(
    "Quiz Assign Successfully",
    `${quizId} assign to ${user.userName}`,
    "success"
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
  checkUser
};

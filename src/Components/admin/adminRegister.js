// import React, { Component } from "react";
// import Navbar from "../Navbar";
// import { Link as RouterLink, Redirect } from "react-router-dom";
// import Swal from "sweetalert2";

// import firebase from "../../Config/firebase";

// class AdminRegister extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loc: "/adminRegister"
//     };
//   }

//   signUp = async () => {
//     const { userName, email, password } = this.state;
//     if (userName === "" || email === "" || password === "") {
//       // Swal.fire("Oops...", "please fill the empty fields", "error");
//     } else {
//       try {
//         await firebase.signUpWithFirebase(email, password);
//         console.log("success");
//         Swal.fire("Success", "Succesfully Registered", "success");
//         this.setState({ loc: "/" });
//       } catch (e) {
//         console.log(e);
//         Swal.fire("Error..", e.message, "error");
//       }
//       this.setState({ signup: false });
//     }
//   };

//   renderRegister = () => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column"
//         }}
//       >
//         <Navbar />
//         <h2 className="adminHeading">Admin SignUP</h2>
//         <div id="line"></div>
//         <div className="form-group" style={{ marginTop: "30px" }}>
//           <input
//             type="text"
//             className="form-control inputLogin"
//             placeholder="User name"
//             style={{ width: "280px" }}
//             onChange={e => {
//               this.setState({ userName: e.target.value });
//             }}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="email"
//             className="form-control inputLogin"
//             placeholder="Enter email"
//             style={{ width: "280px" }}
//             onChange={e => {
//               this.setState({ email: e.target.value });
//             }}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             className="form-control inputLogin"
//             placeholder="Password"
//             style={{ width: "280px" }}
//             onChange={e => {
//               this.setState({ password: e.target.value });
//             }}
//           />
//         </div>
//         <div className="loginBtn">
//           <button type="submit" className="btn" onClick={() => this.signUp()}>
//             Signup
//           </button>
//           <br /> <RouterLink to="/adminLogin">Go to AdminLogin</RouterLink>
//         </div>
//         <Redirect to={this.state.loc} />
//       </div>
//     );
//   };

//   render() {
//     if (localStorage.isAuthenticated) {
//       return <Redirect to="/admin" />;
//     }
//     return (
//       <div>
//         {this.renderRegister()}
//         <Redirect to={this.state.loc} />
//       </div>
//     );
//   }
// }

// export default AdminRegister;

import React, { useState } from "react";
import { useFormik } from "formik";
import { signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/useAuth";

const LoginForm = ({setShow}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (email, password) => {
    setShow(false);
    loginFirebase(email, password);
  };

  const loginFirebase = (email, password)=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("form: ", values);
      handleLogin(values.email, values.password);
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) errors.email = "Your email is require";
      if (!values.password) errors.password = "You must enter a valid password";
      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        Email adress
        <input
          type="text"
          name="email"
          className="form-control m-1"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
        Password
        <input
          type="password"
          name="password"
          className="form-control m-1"
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        <button type="submit" className="btn btn-light m-2">
          Log In
        </button>
        <div>Or</div>
        <button onClick={signInGoogle}>Sing in With Google</button>
      </form>
    </div>
  );
};

export default LoginForm;

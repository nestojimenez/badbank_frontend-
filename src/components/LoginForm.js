import React, { useState } from "react";
import { useFormik } from "formik";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "../firebase/useAuth";

const LoginForm = ({ setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (email, password) => {
    setShow(false);
    loginFirebase(email, password);
  };

  const loginFirebase = (email, password) => {
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
  };

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

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const [submit, setSubmit] = useState(false);

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
      if (!validateEmail(values.email))
        errors.email = "Not valida email format";
      if (!values.password) errors.password = "You must enter a valid password";
      (Object.keys(errors).length===0) ? setSubmit(true) : setSubmit(false);
      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        Email adress
        <div className="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            name="email"
            className={`form-control m-1 aria-label=${"Username"} aria-describedby='${"basic-addon1"}`}
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
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
        {submit && <button type="submit" className="btn btn-light m-2">
          Log In
        </button>}
        <div>Or</div>
        <button onClick={signInGoogle} className="btn btn-outline-success">Sing in With Google<span class="badge bg-secondary">New</span></button>
      </form>
    </div>
  );
};

export default LoginForm;

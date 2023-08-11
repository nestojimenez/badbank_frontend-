import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import auth from "../firebase/useAuth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const CreateAccountForm = ({ setShow }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const createAccountFireBase = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User Token", userCredential.user.accessToken);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("test");
      if (user) {
        console.log("user");
        setUser({ id: user.uid, email: "" });
      } else {
        console.log("null");
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleAccountCreate = (name, email, password) => {
    console.log(name, email, password);

    createAccountFireBase(email, password);

    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      let res = await fetch(url);
      let data = await res.text();
      console.log("Mi Data: ", data);
    })();

    setShow(false);
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

  const [submit, setSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("form: ", values);
      handleAccountCreate(values.name, values.email, values.password);
    },
    validate: (values) => {
      let errors = {};
      //if (!values.name) errors.name = "Please enter user name";
      if (!values.email) errors.email = "Your email is require";
      if (!values.password) errors.password = "You must enter a valid password";
      if(!validateEmail(values.email)) errors.email = "Not valida email format";
      (Object.keys(errors).length===0) ? setSubmit(true) : setSubmit(false);
    
      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        Name
        <input
          type="text"
          name="name"
          className="form-control m-1"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name ? (
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        ) : null}
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
          <div style={{ color: "red" }}>{formik.errors.password} </div>
        ) : null}
        {submit && <button type="submit" className="btn btn-light m-2">
          Create Account
        </button>}
        <div>Or</div>
        <button onClick={signInGoogle} className="btn btn-outline-success">Sing in With Google<span class="badge bg-secondary">New</span></button>
      </form>
    </div>
  );
};

export default CreateAccountForm;

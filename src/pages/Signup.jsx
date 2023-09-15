import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase.config.js";
import app from "../firebase.config.js";

import { toast } from "react-toastify";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //update profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            //store userdata in firestore
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email: user.email,
            });
          });
        }
      );

      // Signed in
      setLoading(false);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>
                <Form className="auth__form" onSubmit={signupUser}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  {/* <FormGroup className="form__group">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup> */}

                  <button
                    type="submit"
                    className="buy__btn auth__btn"
                    name="submitbtn"
                  >
                    Create account
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Login!</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;

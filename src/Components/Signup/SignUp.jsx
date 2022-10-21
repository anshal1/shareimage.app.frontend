import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import URL from "../Url/Url";
import Loader from "../Loader/Loader";
import "./Signup.css";
const SignUp = () => {
  const navi = useNavigate();
  const c = useContext(Context);
  const { setalert } = c;
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const SignUp = async () => {
    setloading(true);
    let url = `${URL}/signup`;
    let data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    let response = await data.json();
    if (!response.error) {
      setloading(false);
      localStorage.setItem("token", response.token);
      navi("/");
      setalert({
        display: "display",
        msg: "Welcome " + response.username,
      });
    } else if (response.error) {
      setloading(false);
      setalert({
        display: "display",
        msg: response.error.error_msg,
      });
    }
  };
  return (
    <>
      <div className="main_signup_container">
        <h1>Sign Up</h1>
        <div className="brand_logo_name_sign_up">
          <h1>
            <span id="share">Share</span> <span id="my">My</span>{" "}
            <span id="image">Image</span>{" "}
          </h1>
        </div>
        <div className="inputs">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="button">
          <button onClick={SignUp}>{loading ? <Loader /> : "Sign Up"}</button>
        </div>
        <div className="button">
          <button onClick={()=>{
            setalert({
              display: "display",
              msg: "Google auth is currently under-development"
            })
          }}>SignUp with Google</button>
          <button
            style={{ color: "blue" }}
            onClick={() => {
              navi("/auth/login");
            }}
          >
            Already have an account?
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;

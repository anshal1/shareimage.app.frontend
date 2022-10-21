import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import "./Navbar.css";
const Navbar = () => {
  const navi = useNavigate();
  const c = useContext(Context);
  const { setalert, likeImage, SavedImage, allImage, isUploading } = c;
  return (
    <>
      <div className="main_navbar_co">
        <div className="brand_logo_name">
          <h2
            onClick={() => {
              navi("/");
              if (!isUploading) {
                allImage();
              }
            }}
          >
            <span id="share">Share</span> <span id="my">My</span>{" "}
            <span id="image">Image</span>{" "}
          </h2>
        </div>
        <div className="others">
          <p
            className="others_content"
            onClick={() => {
              navi("/");
              likeImage();
            }}
          >
            <span>
              <i className="fa-regular fa-heart"></i>
            </span>{" "}
            Liked Images
          </p>
          {/* <p
            className="others_content"
            onClick={() => {
              navi("/");
            }}
          >
            <span>
              <i className="fa-regular fa-heart"></i>
            </span>{" "}
            Your Images
          </p> */}
          <p
            className="others_content"
            onClick={() => {
              navi("/");
              SavedImage();
            }}
          >
            <span>
              <i className="fa-regular fa-bookmark"></i>
            </span>{" "}
            Saved Images
          </p>
          <p
            className="others_content"
            onClick={() => {
              navi("/upload");
            }}
          >
            {" "}
            <span>
              <i className="fa-solid fa-plus"></i>
            </span>{" "}
            Upload ( / )
          </p>
          <p
            id="others_content_specific"
            onClick={() => {
              if (!localStorage.getItem("token")) {
                navi("/auth/signup");
              } else {
                localStorage.removeItem("token");
                setalert({
                  display: "display",
                  msg: "Logged out successfully",
                });
              }
            }}
          >
            {!localStorage.getItem("token") ? "Sign up" : <span>Log out</span>}
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="for_phone_navbar">
        <p
          className="others_content_phone"
          onClick={() => {
            navi("/");
            likeImage();
          }}
        >
          <span>
            <i className="fa-regular fa-heart"></i>
          </span>{" "}
          Liked Images
        </p>
        <p
          className="others_content_phone"
          onClick={() => {
            navi("/");
            SavedImage();
          }}
        >
          <span>
            <i className="fa-regular fa-bookmark"></i>
          </span>{" "}
          Saved Images
        </p>
      </div>
      <br />
    </>
  );
};

export default Navbar;

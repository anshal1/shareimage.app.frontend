import React, { useContext } from "react";
import Context from "../../Context/Context";
import "./ImageCard.css";
// import Img from "./5329292.jpg"
const ImageCard = (props) => {
  const c = useContext(Context);
  const { user } = c;
  return (
    <>
      <div className="main_image_container">
        <div className="image_container">
          <img
            src={props.image}
            alt=""
            onLoad={(e) => {
              e.target.innerHTML = "Loading...";
            }}
          />
          <div className="imageInfo">
            <h3>Uploaded by-: {props.uploader}</h3>
            <p>Uploaded-: {props.date}</p>
          </div>
        </div>
        <div className="options">
          {/* currently using p tags  */}
          {props.include ? (
            <p className="options_content" onClick={props.dislike}>
              <span>
                <i className="fa-solid fa-heart text-primary" onClick={(e)=>{
                  if(e.target.className === "fa-solid fa-heart text-primary"){
                    e.target.classList = "fa-solid fa-heart"
                  }
                }}></i>
              </span>
            </p>
          ) : (
            <p className="options_content" onClick={props.like}>
              <span>
                <i className="fa-regular fa-heart" onClick={(e)=>{
                  if(e.target.className === "fa-solid fa-heart"){
                    e.target.classList = "fa-solid fa-heart text-primary"
                  }
                }}></i>
              </span>
            </p>
          )}
          {/* <p className="options_content"><i class="fa-regular fa-comment"></i></p> */}
          {props.iSsaved ? (
            <p className="options_content" onClick={props.usave}>
              {" "}
              <span>
                <i
                  className="fa-solid fa-bookmark"
                  onClick={(e) => {
                    if (e.target.className === "fa-solid fa-bookmark") {
                      e.target.classList = "fa-regular fa-bookmark";
                    }
                  }}
                ></i>
              </span>{" "}
              Saved
            </p>
          ) : (
            <p className="options_content" onClick={props.save}>
              {" "}
              <span>
                <i
                  className="fa-regular fa-bookmark"
                  onClick={(e) => {
                    if (e.target.className === "fa-regular fa-bookmark") {
                      e.target.classList = "fa-solid fa-bookmark";
                    }
                  }}
                ></i>
              </span>{" "}
              Save
            </p>
          )}
          {user.username === props.owner ? (
            <p className="options_content" onClick={props.delete}>
              {" "}
              <span>
                <i className="fa-solid fa-trash text-danger"></i>
              </span>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ImageCard;

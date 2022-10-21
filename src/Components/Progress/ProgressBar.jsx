import React, { useContext } from "react";
import Context from "../../Context/Context";
import Loader from "../Loader/Loader"
import "./ProgressBar.css";
const ProgressBar = () => {
    const c = useContext(Context);
    const {uploaded} = c
  return (
    <div className="myprogress" style={{ display: `${uploaded.display}`}}>
      <h1>{<Loader />}Uploading Please wait... <span>{uploaded.length}</span></h1>
    </div>
  );
};

export default ProgressBar;

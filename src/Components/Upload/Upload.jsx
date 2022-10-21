import React, { useContext } from "react";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import "./Upload.css";
import Context from "../../Context/Context";
import URL from "../Url/Url";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const c = useContext(Context);
  const { setalert, setuploaded, allImage, setisUploading } = c;
  // For compressing image
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  //  for frontend
  const [file, setfile] = useState();
  const [upload_file, setupload_file] = useState();
  const [loading_image, setloading_image] = useState(false);
  const navi = useNavigate();
  const Showpreview = async (e) => {
    setloading_image(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setfile(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    try {
      const compressedFile = await imageCompression(e.target.files[0], options);
      setupload_file(compressedFile);
      if (compressedFile) {
        setloading_image(false);
      }
    } catch (error) {
      if (error) {
        setalert({
          display: "display",
          msg: "Something went wrong with the file",
        });
      }
    }
  };
  const upload = () => {
    if(!localStorage.getItem("token")){
      setalert({
        display: "display",
        msg: "Please login first",
      })
      return;
    }
    if (!upload_file) {
      setalert({
        display: "display",
        msg: "No image to upload",
      });
    } else {
      const fd = new FormData();
      fd.append("image", upload_file);
      const req = new XMLHttpRequest();
      req.upload.addEventListener("loadstart", () => {
        navi("/");
        setisUploading(true);
      });
      req.upload.onprogress = (e) => {
        setuploaded({
          display: "block",
          length: `${Math.round((e.loaded / e.total) * 100)}%`,
        });
      };
      // });
      req.addEventListener("load", () => {
        if (req.response) {
          setisUploading(false);
          allImage();
          setalert({
            display: "display",
            msg: req.response,
          });
          setuploaded({
            display: "none",
            length: `100%`,
          });
        } else {
          setisUploading(false);
        }
      });
      req.open("POST", `${URL}/upload/image`);
      req.setRequestHeader("token", localStorage.getItem("token"));
      req.send(fd);
    }
  };
  return (
    <>
      <div className="main_upload_container">
        <h2 style={{ textAlign: "center" }}>
          <span id="share">Upload</span> <span id="my">Image</span>{" "}
          <span id="image">Here</span>
        </h2>
        <br />
        <div className="image_preview">
          <img src={file} alt="" id="preview" />
          {loading_image ? (
            <div className="image_loading">
              <h2>Loading Image...</h2>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="button">
          <input type="file" onChange={Showpreview} />
          {loading_image ? (
            <p>Please wait..</p>
          ) : (
            <button onClick={upload}>Upload</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;

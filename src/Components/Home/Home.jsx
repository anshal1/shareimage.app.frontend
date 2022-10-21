import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import { format } from "timeago.js";
// import InfiniteScroll from "react-infinite-scroller";
import URL from "../Url/Url";
import "./Home.css";
const Home = () => {
  const c = useContext(Context);
  const {
    allimage,
    user,
    setallimage,
    setalert,
    setpage,
    page,
    nextpage,
    allImage_newPage,
    currently_watching,
    likeImage_newPage,
    savedImage_newPage,
    loading,
    page_loading,
    allImage,
    isUploading,
  } = c;
  const navi = useNavigate();
  const scrollRef = useRef(null);
  useEffect(() => {
    if (isUploading) {
      allImage();
    }
    document.addEventListener("keypress", (e) => {
      if (e.key === "/") {
        navi("/upload");
      }
    });
    // eslint-disable-next-line
  }, []);
  const Delete = async (image) => {
    if (!localStorage.getItem("token")) {
      setalert({
        display: "display",
        msg: "Please login first",
      });
      return;
    }
    let url = `${URL}/image/delete/${image._id}`;
    let data = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    if (!res.error) {
      const non_deleteImage = allimage.filter((e) => {
        return e._id !== image._id;
      });
      setallimage(non_deleteImage);
      setalert({
        display: "display",
        msg: "Deleted successfully",
      });
    }

    if (res.error) {
      setalert({
        display: "display",
        msg: res.error.error_msg,
      });
    }
  };
  const Like = async (image) => {
    if (!localStorage.getItem("token")) {
      setalert({
        display: "display",
        msg: "Please login first",
      });
      return;
    }
    let url = `${URL}/like/${image._id}`;
    let data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    if (res.error) {
      setalert({
        display: "display",
        msg: res.error.error_msg,
      });
    }
    const newImage = allimage.map((e) => {
      if (e._id === res._id) {
        return res;
      } else {
        return e;
      }
    });
    setallimage(newImage);
  };
  const dislike = async (image) => {
    let url = `${URL}/dislike/${image._id}`;
    let data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    if (res.error) {
      setalert({
        display: "display",
        msg: res.error.error_msg,
      });
    }
    const newImage = allimage.map((e) => {
      if (e._id === res._id) {
        return res;
      } else {
        return e;
      }
    });
    setallimage(newImage);
  };
  const Save = async (image) => {
    if (!localStorage.getItem("token")) {
      setalert({
        display: "display",
        msg: "Please login first",
      });
      return;
    }
    let url = `${URL}/save/${image._id}`;
    let data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    if (res.error) {
      setalert({
        display: "display",
        msg: res.error.error_msg,
      });
    }
    const newImage = allimage.map((e) => {
      if (e._id === res._id) {
        return res;
      } else {
        return e;
      }
    });
    setallimage(newImage);
  };
  const unSave = async (image) => {
    let url = `${URL}/unsave/${image._id}`;
    let data = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    if (res.error) {
      setalert({
        display: "display",
        msg: res.error.error_msg,
      });
    }
    const newImage = allimage.map((e) => {
      if (e._id === res._id) {
        return res;
      } else {
        return e;
      }
    });
    setallimage(newImage);
  };
  const capitalize = (word) => {
    const first_word = word.slice(0, 1);
    const first_word_capital = first_word.toUpperCase();
    return first_word_capital + word.slice(1);
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {capitalize(currently_watching)} images
      </h2>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="main_home_container" id="id" ref={scrollRef}>
          {/* <InfiniteScroll
          pageStart={1}
          loadMore={setpage(page+1)}
          hasMore={nextpage}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        > */}
          {allimage?.map((e) => {
            return (
              <ImageCard
                key={e._id}
                image={e.image}
                delete={() => {
                  Delete(e);
                }}
                like={() => {
                  Like(e);
                }}
                include={e.likes.includes(user.username)}
                dislike={() => {
                  dislike(e);
                }}
                save={() => {
                  Save(e);
                }}
                usave={() => {
                  unSave(e);
                }}
                iSsaved={e.saves.includes(user.username)}
                owner={e.uploaded_by}
                uploader={e.uploaded_by}
                date={format(e.date)}
              />
            );
          })}
          {allimage.length < 1 ? <h1>No Images Available</h1> : ""}
          {/* </InfiniteScroll> */}
          <div className="share_image">
            {/* Use icon here */}
            <i
              className="fa-solid fa-plus"
              onClick={() => {
                navi("/upload");
              }}
            ></i>
          </div>
        </div>
      )}
      {nextpage ? (
        <div className="next">
          <button
            className="LoadMore"
            onClick={() => {
              setpage(page + 1);
              if (currently_watching === "all") {
                allImage_newPage();
              } else if (currently_watching === "liked") {
                likeImage_newPage();
              } else if (currently_watching === "saved") {
                savedImage_newPage();
              }
            }}
          >
            {page_loading ? <Loader /> : "Next"}
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;

import React, { useEffect, useState } from 'react'
import URL from '../Components/Url/Url';
import Context from './Context';
const State = (props) => {
    const [alert, setalert] = useState({
        display: "hide",
        msg: "Welcome"
    })
    const [uploaded, setuploaded] = useState({
        length: "5%",
        display: "none"
    });
    const [allimage, setallimage] = useState([]);
    const [user, setuser] = useState({});
    let [page, setpage] = useState(2);
    const [nextpage, setnextpage] = useState(false);
    const [currently_watching, setcurrently_watching] = useState("all")
    const [loading, setloading] = useState(true);
    const [page_loading, setpage_loading] = useState(false);
    const [isUploading, setisUploading] = useState(false);
    const allImage = async () => {
        setcurrently_watching("all")
        setloading(true);
        setpage(2);
        let url = `${URL}/all/image/?limit=8&page=1`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        let res = await data.json();
        if (!res.error) {
            setallimage(res.post);
            setnextpage(res.isNextPage);
            setloading(false);
        } else {
            setloading(false);
            setalert({
                display: "display",
                msg: res.error.error_msg
            })
        }
    }
    const allImage_newPage = async () => {
        if (!nextpage) {
            return;
        }
        setcurrently_watching("all")
        let url = `${URL}/all/image/?limit=8&page=${page}`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        let res = await data.json();
        if (!res.error) {
            setallimage(allimage.concat(res.post));
            setnextpage(res.isNextPage);
        } else {
            setalert({
                display: "display",
                msg: res.error.error_msg
            })
        }
    }
    const likeImage = async () => {
        if(!localStorage.getItem("token")){
            setalert({
              display: "display",
              msg: "Please login first"
            })
            setloading(false);
            return;
          }
        setcurrently_watching("liked")
        setloading(true)
        setpage(2);
        let url = `${URL}/like/images/?limit=8&page=1`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        let res = await data.json();
        if (!res.error) {
            setloading(false)
            setnextpage(res.isNextPage)
            setallimage(res.post);
        } else if (res.error) {
            setloading(false)
            setalert({
                display: "display",
                msg: res.error.error_msg
            })
        }
    }
    const likeImage_newPage = async () => {
        setpage_loading(true);
        if (!nextpage) {
            return;
        }
        setcurrently_watching("liked")
        let url = `${URL}/like/images/?limit=8&page=${page}`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        let res = await data.json();
        if (!res.error) {
            setallimage(allimage.concat(res.post));
            setnextpage(res.isNextPage);
            setpage_loading(false);
        } else {
            setalert({
                display: "display",
                msg: res.error.error_msg
            })
            setpage_loading(false);
        }
    }
    const SavedImage = async () => {
        if(!localStorage.getItem("token")){
            setalert({
              display: "display",
              msg: "Please login first"
            })
            setloading(false);
            return;
          }
        setcurrently_watching("saved")
        setloading(true);
        setpage(2);
        let url = `${URL}/saved/images/?limit=15&page=1`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        let res = await data.json();
        if (!res.error) {
            setnextpage(res.isNextPage)
            setallimage(res.post);
            setloading(false)
        } else {
            setloading(false)
            setalert({
                display: "display",
                msg: res.error.error_msg
            })
        }
    }
    const savedImage_newPage = async () => {
        setpage_loading(true);
        if (!nextpage) {
            return;
        }
        setcurrently_watching("saved")
        let url = `${URL}/saved/images/?limit=8&page=${page}`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        let res = await data.json();
        if (!res.error) {
            setallimage(allimage.concat(res.post));
            setnextpage(res.isNextPage);
            setpage_loading(false);
        } else {
            setpage_loading(false);
            setalert({
                display: "display",
                msg: res.error.error_msg
            })
        }
    }
    const User = async () => {
        if (!localStorage.getItem("token")) return;
        let url = `${URL}/user`;
        let data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                token: localStorage.getItem("token")
            }
        })
        let res = await data.json();
        setuser(res.user)
    }
    useEffect(() => {
        User();
        allImage();
    }, [])
    return (
        <>
            <Context.Provider value={{ alert, setalert, uploaded, setuploaded, allimage, setallimage, allImage, user, likeImage, SavedImage, setpage, page, nextpage, allImage_newPage, currently_watching, likeImage_newPage, savedImage_newPage, loading, page_loading, setisUploading, isUploading }}>
                {props.children}
            </Context.Provider>
        </>
    )
}

export default State

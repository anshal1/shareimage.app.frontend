import React, { useContext, useEffect } from "react";
import Context from "../../Context/Context";
import "./Alert.css";
const Alert = () => {
  const c = useContext(Context);
  const { alert, setalert } = c;
  useEffect(()=>{
    if(alert.display === "display"){
        setTimeout(()=>{
            setalert({
                display: "hide",
                msg: ""
            })
        }, 2500)
    }
    //eslint-disable-next-line
  }, [alert])
  return (
    <>
      <div className={alert.display} >{alert.msg}</div>
    </>
  );
};

export default Alert;

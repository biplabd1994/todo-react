import React from "react";
import styles from "./InputErrorMsg.module.scss";
function InputErrorMsg(props) {
  return (
    <>
      <span
        className={`${styles["input-error"]}`}
        style={{ color: props.color ?? "#f00" }}
      >
        {props.error}
      </span>
    </>
  );
}

export default InputErrorMsg;

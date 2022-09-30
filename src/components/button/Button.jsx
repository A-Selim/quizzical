import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button className={`btn size-${props.size}`} onClick={props.action}>
      {props.text}
    </button>
  );
}

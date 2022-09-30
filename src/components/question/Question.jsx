import React from "react";
import "./Question.css";

export default function Question(props) {
  return (
    <p className="question">
      {props.text}
      {props.text[props.text.length - 1] !== "?" && "?"}
    </p>
  );
}

import React from "react";
import "./Choice.css";

export default function Choice(props) {
  return (
    <>
      <input
        type="radio"
        name={props.questionId}
        className="choice-radio"
        id={props.answerId}
        value={props.text}
        onChange={() => props.select(props.questionId, props.text)}
        checked={props.checkedValue === props.text}
      />
      <label
        className={`choice ${props.showAnswer ? (props.correctAnswer ? "correct-choice" : "wrong-choice") : ""}`}
        htmlFor={props.answerId}
      >
        {props.text}
      </label>
    </>
  );
}

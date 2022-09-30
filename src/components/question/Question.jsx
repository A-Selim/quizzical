import React from "react";
import "./Question.css";

export function Question(props) {
  return (
    <p className="question">
      {props.text}
      {props.text[props.text.length - 1] !== "?" && "?"}
    </p>
  );
}

export function Choice(props) {
  return (
    <>
      <input
        type="radio"
        name={props.questionId}
        className="choice-radio"
        id={props.answerId}
        value={props.text}
        onChange={(event) => props.select(event)}
        checked={props.checkedValue === props.text}
      />
      <label className={`choice ${props.showCorrect ? "correct-choice" : ""}`} htmlFor={props.answerId}>
        {props.text}
      </label>
    </>
  );
}

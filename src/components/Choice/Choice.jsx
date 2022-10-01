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
        onChange={(event) => props.select(event)}
        checked={props.checkedValue === props.text}
      />
      <label
        className={`choice ${
          props.correctAnswer ? props.showCorrect && "correct-choice" : props.showCorrect && "wrong-choice"
        }`}
        htmlFor={props.answerId}
      >
        {props.text}
      </label>
    </>
  );
}

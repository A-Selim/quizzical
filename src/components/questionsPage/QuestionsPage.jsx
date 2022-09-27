import React from "react";
import Button from "../button/Button";
import { Question, Choice } from "../question/Question";
import "./questionsPage.css";
import data from "../../data";
import { nanoid } from "nanoid";

export default function QuestionsPage() {
  const questionsArr = data.results.map((result) => {
    return {
      id: nanoid(10),
      question: result.question,
      answers: [result.correct_answer, ...result.incorrect_answers],
    };
  });

  const questionWrapperElements = questionsArr.map((element) => {
    return (
      <div className="question-wrapper" key={nanoid(10)}>
        <Question text={element.question} />
        <div className="answers-wrapper">
          {element.answers.map((answer) => (
            <Choice questionId={element.id} answerId={nanoid(10)} text={answer} key={nanoid(10)} />
          ))}
        </div>
      </div>
    );
  });

  return (
    <>
      {questionWrapperElements}
      <Button text="Check answers" size="medium" />
    </>
  );
}


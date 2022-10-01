import React from "react";
import Button from "../Button/Button";
import Question from "../Question/Question";
import Choice from "../Choice/Choice";
import "./QuestionsPage.css";
import { nanoid } from "nanoid";

export default function QuestionsPage() {
  const [questions, setQuestions] = React.useState([]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [playAgain, setPlayAgain] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, [playAgain]);

  async function fetchData() {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple");
    const data = await res.json();
    setQuestions(
      data.results.map((result) => {
        return {
          id: nanoid(10),
          question: decode(result.question),
          answers: [result.correct_answer, ...result.incorrect_answers].sort(() => Math.random() - 0.5),
          correctAnswer: decode(result.correct_answer),
          userAnswer: "",
        };
      })
    );
  }

  const questionWrapperElements = questions.map((element) => {
    return (
      <div className="question-wrapper" key={nanoid(10)}>
        <Question text={element.question} />
        <div className="answers-wrapper">
          {element.answers.map((answer) => (
            <Choice
              questionId={element.id}
              answerId={nanoid(10)}
              text={answer}
              key={nanoid(10)}
              select={handleSelect}
              checkedValue={element.userAnswer}
              showAnswer={showAnswer}
              correctAnswer={answer === element.correctAnswer}
            />
          ))}
        </div>
      </div>
    );
  });

  function handleSelect(id, choiceText) {
    if (!showAnswer) {
      setQuestions((oldQuestions) =>
        oldQuestions.map((question) => {
          return question.id === id
            ? {
                ...question,
                userAnswer: choiceText,
              }
            : question;
        })
      );
    }
  }

  function checkAnswers() {
    if (!showAnswer) {
      questions.forEach((question) => {
        question.userAnswer === question.correctAnswer && setScore((oldScore) => oldScore + 1);
      });
    }

    setShowAnswer(true);
  }

  function resetQuiz() {
    setShowAnswer(false);
    setScore(0);
    setPlayAgain((prevState) => !prevState);
  }

  return (
    <>
      {questionWrapperElements}
      {showAnswer ? (
        <div className="result-wrapper">
          <p className="result-text">You scored {score}/5 correct answers</p>
          <Button text="Play again" size="small" action={resetQuiz} />
        </div>
      ) : (
        questionWrapperElements.length > 0 && <Button text="Check answers" size="medium" action={checkAnswers} />
      )}
    </>
  );
}

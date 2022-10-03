import React from "react";
import Button from "../Button/Button";
import Question from "../Question/Question";
import Choice from "../Choice/Choice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./QuestionsPage.css";
import { decode } from "he";
import { nanoid } from "nanoid";

export default function QuestionsPage() {
  const [questions, setQuestions] = React.useState([]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [playAgain, setPlayAgain] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

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
    setIsLoading(false);
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
              text={decode(answer)}
              key={nanoid(10)}
              select={handleSelect}
              checkedValue={element.userAnswer}
              showAnswer={showAnswer}
              correctAnswer={decode(answer) === element.correctAnswer}
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
    setIsLoading(true);
    setPlayAgain((prevState) => !prevState);
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {questionWrapperElements}
          {showAnswer ? (
            <div className="result-wrapper">
              <p className="result-text">You scored {score}/5 correct answers</p>
              <Button text="Play again" size="small" action={resetQuiz} />
            </div>
          ) : (
            <Button text="Check answers" size="medium" action={checkAnswers} />
          )}
        </>
      )}
    </>
  );
}

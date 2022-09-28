import React from "react";
import Button from "../button/Button";
import { Question, Choice } from "../question/Question";
import "./questionsPage.css";
import { nanoid } from "nanoid";

export default function QuestionsPage() {
  const [questions, setQuestions] = React.useState([]);
  const [isAnswerShow, setIsAnswerShow] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [playAgain, setPlayAgain] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple");
      const data = await res.json();
      setQuestions(
        data.results.map((result) => {
          return {
            id: nanoid(10),
            question: result.question,
            answers: [result.correct_answer, ...result.incorrect_answers].sort(() => Math.random() - 0.5),
            correctAnswer: result.correct_answer,
            userAnswer: "",
            showCorrect: false,
          };
        })
      );
    }
    fetchData();
  }, [playAgain]);

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
              showCorrect={answer === element.correctAnswer && element.showCorrect}
            />
          ))}
        </div>
      </div>
    );
  });

  function handleSelect(event) {
    if (!isAnswerShow) {
      setQuestions((oldQuestions) =>
        oldQuestions.map((question) => {
          return question.id === event.target.name
            ? {
                ...question,
                userAnswer: event.target.value,
              }
            : question;
        })
      );
    }
  }

  function handleCheck() {
    if (!isAnswerShow) {
      setQuestions((oldQuestions) =>
        oldQuestions.map((question) => {
          return {
            ...question,
            showCorrect: true,
          };
        })
      );

      questions.forEach((question) => {
        question.userAnswer === question.correctAnswer
          ? setScore((oldScore) => oldScore + 1)
          : setScore((oldScore) => oldScore + 0);
      });
    }

    setIsAnswerShow(true);
  }

  function resetQuiz() {
    setIsAnswerShow(false);
    setScore(0);
    setPlayAgain((prevState) => !prevState);
  }

  return (
    <>
      {questionWrapperElements}
      {isAnswerShow ? (
        <div className="result-wrapper">
          <p className="result-text">You scored {score}/5 correct answers</p>
          <Button text="Play again" size="small" action={resetQuiz} />
        </div>
      ) : (
        <Button text="Check answers" size="medium" action={handleCheck} />
      )}
    </>
  );
}


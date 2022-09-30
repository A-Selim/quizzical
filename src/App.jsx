import React from "react";
import Button from "./components/Button/Button";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";

export default function App() {
  const [quiz, setQuiz] = React.useState(false);

  function startQuiz() {
    setQuiz(true);
  }

  return (
    <main className="main">
      {quiz ? (
        <QuestionsPage />
      ) : (
        <div className="start-container">
          <h1 className="title">Quizzical</h1>
          <p className="subtitle-text">Have fun and answer some questions about movies</p>
          <Button text="Start quiz" size="large" action={startQuiz} />
        </div>
      )}
    </main>
  );
}

/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';

function ResultWidget({ results, name }) {
  return (
    <Widget>

      <Widget.Header>
        {`Resultados de ${name}`}
      </Widget.Header>

      <Widget.Content>
        <p>{`Você acertou ${results.filter(Boolean).length} perguntas!`}</p>
        <ul>
          {results.map((result, resultIndex) => (
            <li key={`result__${resultIndex}`}>
              {`${resultIndex + 1}: ${result ? 'CERTO' : 'ERRADO'}`}
            </li>
          ))}
        </ul>
      </Widget.Content>

    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasSelectedAlternative = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        src={question.image}
        alt="question"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />
      <Widget.Content>
        <h3>{question.title}</h3>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmitted(true);
          setTimeout(() => {
            addResult(isCorrect);
            setSelectedAlternative(undefined);
            setIsQuestionSubmitted(false);
            onSubmit();
          }, 3 * 1000);
        }}
        >

          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input id={alternativeId} name={questionId} type="radio" onChange={() => setSelectedAlternative(alternativeIndex)} style={{ display: 'none' }} />
                {alternative}

              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasSelectedAlternative}>Confirmar</Button>
        </AlternativesForm>

        {isQuestionSubmitted && isCorrect && <p>Você acertou!</p>}
        {isQuestionSubmitted && !isCorrect && <p>Você errou!</p>}

      </Widget.Content>

    </Widget>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };
  const { name } = router.query;
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  function handleSubmit() {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ
          && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
          )}

        {screenState === screenStates.LOADING && <div>carregando!!</div>}

        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}

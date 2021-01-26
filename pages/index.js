import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
width: 100%;
max-width: 350px;
padding-top: 45px;
margin: auto 10%;
@media screen and (max-width: 500px) {
margin: auto;
padding: 15px;
}
`;

export const NameInput = styled.input`
  width: 100%;
  background-color: ${db.theme.colors.mainBg};
  color: ${db.theme.colors.contrastText};
  border: 1px solid ${db.theme.colors.primary};
  outline: none;
  padding: 1em 0.3em;
  border-radius: ${db.theme.borderRadius};

`;

export const PlayButton = styled.button`

  width: 100%;
  background-color: ${db.theme.colors.secondary};
  color: ${db.theme.colors.contrastText};
  padding: 0.7em; 0.3em;
  margin-top: 1em;
  border: 1px solid ${db.theme.colors.primary};
  border-radius: ${db.theme.borderRadius};
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  &:disabled {
    border: 1px solid gray;
    background: gray;
    cursor: default;
  }

`;

export default function Home() {
  const [name, setName] = React.useState('');
  const router = useRouter();

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <NameInput placeholder="Digite seu nome para jogar :)" onChange={(e) => setName(e.target.value)} />
                <PlayButton type="submit" disabled={name.length === 0}>
                  Jogar
                  {' '}
                  {name}
                </PlayButton>
              </form>

            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/erickcpassos/algoquiz" />
      </QuizBackground>
    </>
  );
}

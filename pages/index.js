import React from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';

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
                <Input placeholder="Digite seu nome para jogar :)" onChange={(e) => setName(e.target.value)} />
                <Button type="submit" disabled={name.length === 0}>
                  Jogar
                  {' '}
                  {name}
                </Button>
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

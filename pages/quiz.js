import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import { QuizContainer } from '.';

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <p>
              Oi,
              {name}
            </p>
          </Widget.Header>
          <Widget.Content>
            <p>Opções</p>
            <p>Opções</p>
            <p>Opções</p>
            <p>Opções</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}

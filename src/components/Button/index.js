import styled from 'styled-components';
import db from '../../../db.json';

const Button = styled.button`
  width: 100%;
  background-color: ${db.theme.colors.secondary};
  color: ${db.theme.colors.contrastText};
  padding: 0.7em 0.3em;
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

export default Button;

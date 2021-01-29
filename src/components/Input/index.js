import styled from 'styled-components';
import db from '../../../db.json';

const Input = styled.input`
  width: 100%;
  background-color: ${db.theme.colors.mainBg};
  color: ${db.theme.colors.contrastText};
  border: 1px solid ${db.theme.colors.primary};
  outline: none;
  padding: 1em 0.8em;
  border-radius: ${db.theme.borderRadius};

`;

export default Input;

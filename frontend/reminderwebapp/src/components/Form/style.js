import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  margin-inline: auto;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  padding: 20px;
  border: 2px solid #ddd;
  width: 100%;
  max-width: 500px;
  background-color: rgb(0 0 0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 25px;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 10px;
    gap: 10px;
  }
`;

export default Form;

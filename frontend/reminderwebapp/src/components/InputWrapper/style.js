import styled from 'styled-components';

export const InputWithLabel = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
  transition: all 0.3s ease;
  pointer-events: none;
`;

export const Input = styled.input`
  width: 95%;
  padding: 14px 16px 14px 40px;
  border: 2px solid #d1d5db;
  font-size: 16px;
  outline: none;
  background-color: #f9fafb;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;

  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.4);
  }

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.4);
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: 0px;
    left: 12px;
    font-size: 12px;
    color: #4f46e5;
    background-color: #fff;
    padding: 0.25rem;
    border-radius: 4px;
    border: 1px solid #4f46e5;
  }
`;

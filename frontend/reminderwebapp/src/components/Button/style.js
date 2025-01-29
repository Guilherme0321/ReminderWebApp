import { styled } from "styled-components";

export const Button = styled.button`
    width: 50%;
    padding: 1vh;
    border: 2px solid #d1d5db;
    font-size: 16px;
    outline: none;
    background-color: #f9fafb;
    border-radius: 8px;
    margin-bottom: 2vh;
;`

export const DeleteButton = styled.button`
    background: red;
    border: none;
    border-radius: 1vh;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        scale: 1.2;
    }
`
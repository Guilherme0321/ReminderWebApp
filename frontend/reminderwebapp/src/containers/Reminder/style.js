import styled from "styled-components";

export const Title = styled.h1`
    font-family: arial;
    color: white;
`;

export const DivReminderList = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #1f2937;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 8px;
  }

  div {
    margin-bottom: 24px;

    h1 {
      font-size: 18px;
      color: #4b5563;
      margin-bottom: 8px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display:flex;
        justify-content: space-between;
        background-color: #e5e7eb;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 8px;
        transition: all 0.3s ease;
        font-size: 16px;
        color: #111827;

        &:hover {
          background-color: #d1d5db;
          transform: translateX(5px);
        }

        p {
            margin: 0;
            font-family: arial;
        }
      }
    }
  }
`;

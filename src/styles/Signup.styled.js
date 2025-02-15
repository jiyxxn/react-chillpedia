import styled from 'styled-components';

export const StSignupFormBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 1100px;
  gap: 30px;
`;

export const StSignupInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gray);
  border-radius: 20px;
  padding: 74px 70px 74px 70px;
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    0px 6px 10px 0px rgba(0, 0, 0, 0.12);
  gap: 40px;

  .input-type {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    background-color: var(--color-beige);
    font-size: 22px;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);

    span {
      text-align: center;
      width: 100%;
      padding: 26px 0 26px 0;
    }

    span + span {
      border-top: 1px solid var(--color-black);
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;

    input {
      height: 50px;
      border: 1px solid var(--color-gray);
      border-radius: 50px;
      background-color: transparent;
      padding: 0 20px 0 20px;
      box-sizing: border-box;
      font-size: 18px;
    }

    > input {
      width: calc(100% - 120px);
    }

    > div > input {
      width: 100%;
    }

    .input-button-box {
      display: flex;
      gap: 20px;

      button,
      span {
        font-size: 18px;
        width: 100px;
        height: 50px;
        flex-shrink: 0;
        border: 1px solid var(--color-gray);
        background-color: var(--color-beige);
        border-radius: 50px;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-green);
      }
    }
  }
`;

export const StSubmitButton = styled.button`
  height: 80px;
  background-color: var(--color-beige);
  border: 1px solid var(--color-gray);
  border-radius: 20px;
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    0px 6px 10px 0px rgba(0, 0, 0, 0.12);
  font-size: 26px;
`;

import styled from "styled-components";

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
  gap: 40px;
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    0px 6px 10px 0px rgba(0, 0, 0, 0.12);

  .input-type {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    background-color: var(--color-beige);
    font-size: 22px;

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
    row-gap: 30px;

    input {
      width: 100%;
      height: 50px;
      border: 1px solid var(--color-gray);
      border-radius: 50px;
      background-color: transparent;
      padding: 0 20px 0 20px;
      box-sizing: border-box;
      font-size: 22px;
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

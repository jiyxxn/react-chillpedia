import styled from 'styled-components';

export const StDetailSection = styled.section`
  display: flex;
  width: 75%;
  max-width: 1100px;
  flex-flow: column nowrap;
  gap: 30px;

  .userRow {
    display: flex;
    justify-content: space-between;
  }
  .userRow span {
    font-size: 26px;
  }
  .userRow > div {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .userProfile {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const StDetailBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 20px;
  padding: 74px 70px;
  gap: 8%;
  border: solid 1px var(--color-gray);
  background-color: var(--color-white);
  box-shadow: 0 4px 8px 3px #00000015;

  div {
    flex-shrink: 1;
    max-width: 400px;
    min-width: 200px;
  }

  .detail-left h2 {
    font-size: 26px;
  }

  .detail-left div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;
  }
  .detail-left span {
    font-size: 18px;
  }
  ul {
    flex-grow: 1;
    min-width: 400px;
  }

  li {
    padding: 20px;
    border-radius: 10px;
    border: solid 1px var(--color-gray);
  }

  li + li {
    margin-top: 30px;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 6px;
  }

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

export const StCommentSection = styled.section`
  display: flex;
  width: 75%;
  max-width: 1100px;
  flex-flow: column nowrap;
  gap: 30px;
  border-radius: 20px;
  padding: 50px 70px;
  border: solid 1px var(--color-gray);
  background-color: var(--color-beige);
  box-shadow: 0 4px 8px 3px #00000015;

  h2 {
    font-size: 26px;
  }

  .inputRow {
    display: flex;
    gap: 6px;
  }
  .inputRow button {
    width: 80px;
    height: 50px;
    background-color: var(--color-green);
    color: var(--color-white);
    border: none;
    border-radius: 16px;
    cursor: pointer;
  }

  input {
    border: none;
    background-color: var(--color-white);
    flex: 1;
    height: 50px;
    border-radius: 12px;
    padding-left: 20px;
  }
  input:focus {
    outline: none;
  }
  li + li {
    margin-top: 40px;
  }

  .commentTopRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: solid 1px var(--color-gray);
  }
  .commentTopRow p {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 18px;
  }
  .commentTopRow img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

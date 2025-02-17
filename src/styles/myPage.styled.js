import styled from 'styled-components';

export const StProfile = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--color-black);
  border-radius: 20px;
  padding: 40px 70px 40px 70px;
  gap: 50px;
  background-color: var(--color-white);
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    0px 6px 10px 0px rgba(0, 0, 0, 0.12);

  .profile-image-box {
    display: flex;
    flex-direction: column;
    gap: 20px;

    img {
      width: 150px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background-color: white;
    }

    input {
      display: none;
    }

    .edit-file-button {
      width: 150px;
      height: 40px;
      background-color: var(--color-beige);
      border: 1px solid var(--color-black);
      border-radius: 14px;
      font-weight: 18px;
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 50px;

    h3 {
      font-size: 32px;
      font-weight: 600;
    }

    .nickname-box {
      display: flex;
      flex-direction: row;
      align-items: center;

      input {
        width: 120px;
        height: 30px;
        border: 1px solid var(--color-black);
        border-radius: 8px;
        padding: 0 9px 0 9px;
        margin: 0 9px 0 20px;
      }

      button {
        width: 50px;
        height: 30px;
        background-color: var(--color-beige);
        border: 1px solid var(--color-black);
        border-radius: 8px;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 16px;
    }
  }
`;

export const StMyPost = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    padding: 25px 35px 25px 35px;
  }

  .emptyPostList {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1100px;
    height: 300px;
    border: 1px solid var(--color-black);
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 80px 125px 80px 125px;
    border: 1px solid var(--color-black);
  }
`;

export const StPreviewCard = styled.div`
  padding: 33px 50px 33px 50px;
  border: 1px solid var(--color-black);

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }

  .title-location {
    display: flex;
    flex-direction: row;

    h3 {
      flex: 1;
    }
  }

  .date-button {
    display: flex;
    flex-direction: row;

    span {
      flex: 1;
    }
  }
`;

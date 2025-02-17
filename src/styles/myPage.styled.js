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
    margin: 0 auto 0 25px;
    background-color: var(--color-beige);
    border: 1px solid var(--color-black);
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    padding: 25px 35px 25px 35px;
    font-size: 22px;
  }

  .emptyPostList {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1100px;
    height: 300px;
    border: 1px solid var(--color-black);
    border-radius: 20px;
    box-shadow:
      0px 2px 3px 0px rgba(0, 0, 0, 0.15),
      0px 6px 10px 0px rgba(0, 0, 0, 0.12);
    font-size: 18px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 80px 125px 80px 125px;
    border: 1px solid var(--color-black);
    border-radius: 20px;
    column-gap: 50px;
    row-gap: 45px;
    box-shadow:
      0px 2px 3px 0px rgba(0, 0, 0, 0.15),
      0px 6px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;

export const StPreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 33px 50px 15px 50px;
  background-color: var(--color-beige);
  border-radius: 20px;
  box-shadow:
    0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    0px 6px 10px 0px rgba(0, 0, 0, 0.12);

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }

  .post-info {
    display: flex;
    flex-direction: column;
    gap: 19px;

    .title-location {
      display: flex;
      flex-direction: row;

      h3 {
        font-size: 22px;
        flex: 1;
      }

      span {
        color: var(--color-gray);
        font-size: 18px;
      }
    }

    .date-button {
      display: flex;
      flex-direction: row;

      span {
        flex: 1;
        color: var(--color-gray);
        font-size: 18px;
      }

      button {
        width: 50px;
        height: 24px;
        border: 1px solid var(--color-black);
        border-radius: 8px;
        font-size: 12px;
      }

      .edit-button {
        background-color: var(--color-white);
      }

      .delete-button {
        margin-left: 10px;
        background-color: var(--color-beige);
      }
    }
  }
`;

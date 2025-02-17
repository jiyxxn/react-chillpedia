import styled from 'styled-components';

export const StProfile = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--color-gray);
  padding: 40px 70px 40px 70px;

  .profile-image-box {
    display: flex;
    flex-direction: column;

    img {
      width: 150px;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
    }
  }

  .nickname-box {
    display: flex;
    flex-direction: row;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }
`;

import styled from 'styled-components';

const LayoutHeader = () => {
  return (
    <HeaderBox>
      <div>LayoutHeader</div>
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  width: 100%;
  height: 160px;
  background-color: #efe1c6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default LayoutHeader;

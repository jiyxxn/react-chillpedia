import styled from 'styled-components';

// select box 만들어서 띄워주는 로직
export const HandleSelectBox = ({
  datas,
  selectName,
  selectValue,
  selectOnChange,
}) => {
  return (
    <StSelect name={selectName} value={selectValue} onChange={selectOnChange}>
      {datas.map((data) => {
        return (
          <option key={data[0]} value={data[1]}>
            {data[1]}
          </option>
        );
      })}
    </StSelect>
  );
};

const StSelect = styled.select`
  width: 100%;
  max-width: 400px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid var(--color-gray);

  padding: 0 20px;
  font-size: 16px;
  font-family: 'Pretendard Variable', Pretendard, sans-serif;
  font-weight: 400;
  color: #333;
  line-height: 1.4;
  appearance: none;

  background:
    url('/icon_select_down.png') no-repeat right 16px center/ 14px,
    var(--color-white);
  cursor: pointer;
`;

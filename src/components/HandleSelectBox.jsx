// select box 만들어서 띄워주는 로직
export const HandleSelectBox = ({
  datas,
  selectName,
  selectValue,
  selectOnChange,
}) => {
  return (
    <select name={selectName} value={selectValue} onChange={selectOnChange}>
      {datas.map((data) => {
        return (
          <option key={data[0]} value={data[1]}>
            {data[1]}
          </option>
        );
      })}
    </select>
  );
};

export default function Category() {
  const foodTypes = [
    { foodType: '한식' },
    { foodType: '중식' },
    { foodType: '양식' },
    { foodType: '일식' },
    { foodType: '분식' },
    { foodType: '아시안' },
    { foodType: '디저트' },
  ];

  return (
    <select>
      {foodTypes.map((foodType) => {
        return (
          <option key={foodType.foodType} value={foodType.foodType}>
            {foodType.foodType}
          </option>
        );
      })}
    </select>
  );
}

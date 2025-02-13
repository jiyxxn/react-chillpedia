export default function DistrictList() {
  const districts = [
    { name: "서울" },
    { name: "인천" },
    { name: "경기" },
    { name: "대전" },
    { name: "세종" },
    { name: "충남" },
    { name: "충북" },
    { name: "광주" },
    { name: "전북" },
    { name: "전남" },
    { name: "부산" },
    { name: "대구" },
    { name: "울산" },
    { name: "경북" },
    { name: "경남" },
    { name: "강원" },
    { name: "제주" },
  ];

  return (
    <select>
      {districts.map((district) => {
        return (
          <option key={district.name} value={district.name}>
            {district.name}
          </option>
        );
      })}
    </select>
  );
}

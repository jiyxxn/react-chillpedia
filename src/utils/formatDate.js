// * 날짜 형식을 바꾸는 함수
export const formatDate = (dateString, format) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  switch (format) {
    // YYYY-MM-DD
    case 'hyphen':
      return `${year}-${month}-${day}`;

    // YYYY. MM. DD.
    case 'dots':
      return `${year}. ${month}. ${day}.`;

    // YYYY/MM/DD
    case 'dash':
      return `${year}/${month}/${day}`;

    default:
      return `${year}-${month}-${day}`;
  }
};

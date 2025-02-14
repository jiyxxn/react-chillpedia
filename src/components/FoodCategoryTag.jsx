import styled from 'styled-components';

const FoodCategoryTag = ({ category }) => {
  const matchColorCategory = (category) => {
    switch (category) {
      case '한식':
        return '#FFABAB';
      case '중식':
        return '#FFC8AB';
      case '양식':
        return '#FFFFAB';
      case '일식':
        return '#D5FFAB';
      case '분식':
        return '#ABE3FF';
      case '아시안':
        return '#ABB6FF';
      case '디저트':
        return '#CEABFF';
    }
  };

  return (
    <StCategoryLabels $backgroundColor={matchColorCategory(category)}>
      {category}
    </StCategoryLabels>
  );
};

const StCategoryLabels = styled.span`
  position: absolute;
  right: -65px; /* 라벨 크기만큼 오른쪽으로 이동 */
  padding: 8px 18px;
  background-color: ${(props) => props.$backgroundColor || '#fefefe'};
`;

export default FoodCategoryTag;

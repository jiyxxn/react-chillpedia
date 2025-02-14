export default function PriceList() {
  const prices = [
    { price: '10,000원 이하' },
    { price: '10,000원 ~ 20,000원' },
    { price: '20,000원 ~ 30,000원' },
    { price: '30,000원 ~ 40,000원' },
    { price: '40,000원 ~ 50,000원' },
    { price: '50,000원 이상' },
  ];

  return (
    <select>
      {prices.map((price) => {
        return (
          <option key={price.price} value={price.price}>
            {price.price}
          </option>
        );
      })}
    </select>
  );
}

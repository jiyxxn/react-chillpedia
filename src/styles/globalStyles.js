import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-black: #333;
    --color-gray: #66666e;
    --color-white: #faf6ea;
    --color-beige: #efe1c6;
    --color-green: #95b645;
  }

  body, button, input {
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    font-size: 16px;
    letter-spacing: -0.002em;
    color: var(--color-black);
  }

  button {
    cursor: pointer;
  }

`;

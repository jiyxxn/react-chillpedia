import { Bounce } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const ToastAlert = () => {
  return <StToast />;
};

export default ToastAlert;

const StToast = styled(ToastContainer).attrs({
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: 'light',
  transition: Bounce,
})`
  .Toastify__toast {
    font-size: 18px;
  }
`;

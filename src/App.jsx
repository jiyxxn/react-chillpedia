import UserLoginProvider from './providers/AuthProvider';
import Router from './shared/Router';
import { GlobalStyles } from './styles/globalStyles';
import ToastAlert from './components/ToastAlert';

function App() {
  return (
    <>
      <UserLoginProvider>
        <GlobalStyles />
        <Router />
      </UserLoginProvider>
      <ToastAlert />
    </>
  );
}

export default App;

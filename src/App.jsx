import UserLoginProvider from './providers/AuthProvider';
import Router from './shared/router';
import { GlobalStyles } from './styles/globalStyles';

function App() {
  return (
    <UserLoginProvider>
      <GlobalStyles />
      <Router />
    </UserLoginProvider>
  );
}

export default App;

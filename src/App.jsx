import UserLoginProvider from './providers/AuthProvider';
import UserProfilesProvider from './providers/UserProfilesProvider';
import Router from './shared/router';
import { GlobalStyles } from './styles/globalStyles';
import ToastAlert from './components/ToastAlert';

function App() {
  return (
    <>
      <UserLoginProvider>
        <UserProfilesProvider>
          <GlobalStyles />
          <Router />
        </UserProfilesProvider>
      </UserLoginProvider>
      <ToastAlert />
    </>
  );
}

export default App;

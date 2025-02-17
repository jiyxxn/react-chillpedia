import LayoutHeader from './components/LayoutHeader';
import UserLoginProvider from './providers/AuthProvider';
import UserProfilesProvider from './providers/UserProfilesProvider';
import Router from './shared/router';
import { GlobalStyles } from './styles/globalStyles';

function App() {
  return (
    <UserLoginProvider>
      <UserProfilesProvider>
        <GlobalStyles />
        <LayoutHeader />
        <Router />
      </UserProfilesProvider>
    </UserLoginProvider>
  );
}

export default App;

import UserLoginProvider from './providers/AuthProvider';
import Router from './shared/router';

function App() {
  return (
    <UserLoginProvider>
      <Router />
    </UserLoginProvider>
  );
}

export default App;

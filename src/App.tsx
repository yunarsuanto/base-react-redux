import './App.css';
import { useAppDispatch, useAppSelector } from './app/hook';
import { fetchLogin, logout } from './features/auth/auth';

function App() {
  const { user, token, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(fetchLogin({ username: 'mor_2314', password: '83r5^_' }));
  };


  const handleLogout = () => {
    dispatch(logout());
  };


  console.log('------ isAuthenticated')
  console.log(token)
  console.log(user)
  console.log(isAuthenticated)
  console.log(loading)
  console.log(error)
  console.log('------ isAuthenticated')
  return (
    <div>
      <h1>Hello React</h1>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;

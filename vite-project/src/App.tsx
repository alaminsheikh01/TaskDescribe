import { useAuthContext } from "./authContext";

const App = () => {
  console.log("App rendered");
  const { isAuthenticated, currentUser, login, logout } = useAuthContext();

  return (
    <div>
      <h2>Hello</h2>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {currentUser.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => login({ name: "John Doe", email: "john.doe@example.com" })}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
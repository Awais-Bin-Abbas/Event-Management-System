import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    const user = users.find(
      (user) =>
        user.email === email.trim().toLowerCase() &&
        user.password === password
    );

    if (user) {
      const currentUser = {
        name: user.name,
        email: user.email,
      };

      dispatch(login(currentUser));

      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      setMessage("Login successful!");
      setEmail("");
      setPassword("");
    } else {
      setMessage("Invalid email or password.");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
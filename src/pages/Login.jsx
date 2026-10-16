
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

    const cleanEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const user = users.find(
      (user) =>
        user.email === cleanEmail &&
        user.password === password
    );

    if (!user) {
      setMessage("Invalid email or password.");
      return;
    }

    const currentUser = {
      name: user.name,
      email: user.email,
    };

    dispatch(login(currentUser));

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    setMessage("Login successful!");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
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

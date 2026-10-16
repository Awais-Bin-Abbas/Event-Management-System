
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName) {
      setMessage("Please enter your name.");
      return;
    }

    if (!emailPattern.test(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    const alreadyRegistered = users.some(
      (user) => user.email === cleanEmail
    );

    if (alreadyRegistered) {
      setMessage("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      password: password,
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    dispatch(registerUser(newUser));

    setMessage("Account created successfully! You can now log in.");

    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Create Account</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Register</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Register;

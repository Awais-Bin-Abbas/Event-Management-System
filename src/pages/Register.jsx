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

    const userEmail = email.trim().toLowerCase();

    const alreadyRegistered = users.some(
      (user) => user.email === userEmail
    );

    if (alreadyRegistered) {
      setMessage("An account with this email already exists.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: userEmail,
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
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
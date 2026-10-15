import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/events">Events</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <span>{user ? user.name : "Guest"}</span>
    </nav>
  );
}

export default Navbar;
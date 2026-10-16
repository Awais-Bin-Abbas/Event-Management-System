import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("currentUser");
  }

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/events">Events</Link> |{" "}
      <Link to="/my-events">My Events</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}

      {user ? (
        <>
          <span>{user.name}</span>{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <span>Guest</span>
      )}
    </nav>
  );
}

export default Navbar;
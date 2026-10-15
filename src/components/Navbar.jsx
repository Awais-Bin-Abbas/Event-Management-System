import { Link } from "react-router-dom";

//with link we can route between the pages with the website reloading 
function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/events">Events</Link>
    </nav>
  );
}

export default Navbar;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile data:", data); 
        if (data.username) {
          setUsername(data.username);
        } else {
          setUsername(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setUsername(null);
      });
  }, []);

  return (
    <nav className="shadow flex items-center justify-between py-4 px-4 sm:px-10 md:px-16 lg:px-20">
      <h2 className="text-lg sm:text-2xl font-semibold">
        <Link to="/">MyBlog</Link>
      </h2>
      {username ? (
        <div>
          <Link to="/create">Create new post</Link>
        </div>
      ) : (
        <ul className="flex items-center gap-4">
          <li className="text-lg font-semibold">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-lg font-semibold">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

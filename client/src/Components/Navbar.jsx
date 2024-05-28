import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch profile");
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [setUserInfo]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username = userInfo?.username;

  return (
    <nav className="shadow flex items-center justify-between py-4 px-4 sm:px-10 md:px-16 lg:px-20">
      <h2 className="text-lg sm:text-2xl font-semibold">
        <Link to="/">MyBlog</Link>
      </h2>
      {username ? (
        <ul className="flex items-center gap-4">
          <li className="text-lg font-semibold">
            <Link to="/create">Create New Post</Link>
          </li>
          <li onClick={handleLogout} className="text-lg font-semibold">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
          </li>
        </ul>
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

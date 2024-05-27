import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { userInfo,setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
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
            Logout
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

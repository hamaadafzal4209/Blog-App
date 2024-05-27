import { useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching profile:', error));
    }, []);
    
    return (
        <nav className="shadow flex items-center justify-between py-4 px-4 sm:px-10 md:px-16 lg:px-20">
            <h2 className="text-lg sm:text-2xl font-semibold">
                <Link to='/'>MyBlog</Link>
            </h2>
            <ul className="flex items-center gap-4">
                <li className="text-lg font-semibold">
                    <Link to='/login'>Login</Link>
                </li>
                <li className="text-lg font-semibold">
                    <Link to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

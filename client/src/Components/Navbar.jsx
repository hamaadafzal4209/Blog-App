import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6 px-4 sm:px-10 md:px-16 lg:px-20">
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
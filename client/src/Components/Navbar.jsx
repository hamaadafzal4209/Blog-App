import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6">
            <h2 className="text-lg sm:text-2xl font-semibold">MyBlog</h2>
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
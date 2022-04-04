import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../services/all-provider";


const Navbar = () => {
  const { name, isLoggedIn, logout } = useContext(AuthContext)
  return (
    <nav className="text-lg font-medium">
      <div className='logo'>
        <h1>Palm planter</h1>
        {isLoggedIn && <h1>Welcome, {name}</h1>}
        {!isLoggedIn && <h1>Welcome, Guest</h1>}
      </div>
      <Link href="/"><a>Home</a></Link>
      <Link href="/map"><a>Map</a></Link>
      <Link href="/myfarm"><a>My Farm</a></Link>
      <Link href="/notification"><a>Notification</a></Link>
      {!isLoggedIn && <Link href="/signin"><a>Sign In</a></Link>}
      {isLoggedIn && <Link href="/signin"><a className="cursor-pointer" onClick={logout}>Logout</a></Link>}


    </nav>
  );
}

export default Navbar;
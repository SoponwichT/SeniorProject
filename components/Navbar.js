import Link from "next/link";
import SignIn from "./Login"
import SignOut from "./Logout"

const Navbar = () => {
  return (
    <nav>
        <div className='logo'>
            <h1>Palm planter</h1>
        </div>
        <Link href="/"><a>Home</a></Link>
        <Link href="/map"><a>Map</a></Link>
        <Link href="/myfarm"><a>My Farm</a></Link>
        <Link href="/notification"><a>Notification</a></Link>
        <button onClick={SignIn}>Login</button>
        <button onClick={SignOut}>Logout</button>
    </nav>
  );
}
 
export default Navbar;